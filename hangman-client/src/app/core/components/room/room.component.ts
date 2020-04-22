import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  players: string[] = [];
  roomId: string;
  constructor(
    private socketService: SocketService,
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.playersService.resetPlayers();

    this.roomId = this.route.snapshot.params.ID;
    this.socketService.sendMessage<{players: string[]}>('join-room', this.roomId, (resp) => {
      console.log('join-room', resp);
      if (!resp.ok) {
        this.router.navigate(['manage-room']);
      } else {
        this.playersService.addPlayers(resp.data.players);
      }
    });

    this.playersService.getPlayers$().pipe(
      tap( players => this.players = players)
    ).subscribe();

    this.socketService.getMessages$('go-to-start').pipe(
      tap( () => this.router.navigate(['play', this.roomId]))
    ).subscribe();
  }

  startGame() {
    this.socketService.sendMessage('init-game', undefined);
  }
}
