import { tap } from 'rxjs/operators';
import { SocketService } from './socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayersService {
  private players$: BehaviorSubject<PlayerInfo[]> = new BehaviorSubject([]);
  private subs: Subscription = new Subscription();
  private name: string;

  constructor(
    private socketService: SocketService
  ) {
    this.subs.add(
      this.socketService.getMessages$<PlayerInfo>('player-leave').pipe(
        tap(({data: player}) => {
          const players = this.players$.value.filter(p => p.id !== player.id);
          this.players$.next(players);
        })
      ).subscribe()
    );

    this.subs.add(
      this.socketService.getMessages$<PlayerInfo>('player-join').pipe(
        tap(({data: player}) => {
          const players = [...this.players$.value, player];
          this.players$.next(players);
        })
      ).subscribe()
    );
  }

  getPlayers$() {
    return this.players$.asObservable();
  }

  resetPlayers() {
    this.players$.next([]);
  }

  addPlayers(players: PlayerInfo[]) {
    let currPlayers = this.players$.value;
    players.forEach(p => {
      if (!currPlayers.find(cp => cp.id === p.id)) {
        currPlayers = [...currPlayers, p];
      }
    });
    this.players$.next(currPlayers);
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

export interface PlayerInfo {
  id: string;
  name: string;
  points: string;
}
