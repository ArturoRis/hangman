import { tap } from 'rxjs/operators';
import { SocketService } from './socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayersService {
  private players$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private subs: Subscription = new Subscription();

  constructor(
    private socketService: SocketService
  ) {
    this.subs.add(
      this.socketService.getMessages$('player-leave').pipe(
        tap(resp => {
          const players = this.players$.value.filter(p => p !== resp.data);
          this.players$.next(players);
        })
      ).subscribe()
    );

    this.subs.add(
      this.socketService.getMessages$('player-join').pipe(
        tap(resp => {
          const players = [...this.players$.value, resp.data];
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

  addPlayers(players: string[]) {
    let currPlayers = this.players$.value;
    players.forEach(p => {
      if (!currPlayers.find(cp => cp === p)) {
        currPlayers = [...currPlayers, p];
      }
    });
    this.players$.next(currPlayers);
  }
}
