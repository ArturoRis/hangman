import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PlayerInfo, PlayersService } from '../../services/players.service';
import { BaseComponent } from '../../base-objects/base-component';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  players: PlayerInfo[] = [];
  roomId: string;

  constructor(
    private socketService: SocketService,
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.playersService.resetPlayers();

    this.roomId = this.route.snapshot.params.ID;
    this.socketService.sendMessage<any>('join-room', {roomId: this.roomId, name: this.playersService.getName()}, (resp) => {
      console.log('join-room', resp);
      if (!resp.ok) {
        localStorage.setItem('hmo-game-state', JSON.stringify(resp.data));
        this.router.navigate(['manage-room']);
      } else {
        this.playersService.addPlayers(resp.data.players);
      }
    });

    this.addSubscription(
      this.playersService.getPlayers$().pipe(
        tap(players => this.players = players)
      ).subscribe()
    );

    this.addSubscription(
      this.socketService.getMessages$('go-to-start').pipe(
        tap(() => this.router.navigate(['play', this.roomId]))
      ).subscribe()
    );
  }

  startGame() {
    this.socketService.sendMessage('init-game', undefined);
  }
}
