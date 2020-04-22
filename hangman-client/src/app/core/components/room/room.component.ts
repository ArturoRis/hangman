import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params.ID;
    this.socketService.sendMessage<{players: string[]}>('join-room', this.roomId, (resp) => {
      console.log('join-room', resp);
      if (resp.ok) {
        this.players = resp.data.players;
      } else {
        this.router.navigate(['manage-room']);
      }
    });

    this.socketService.getMessages$('player-leave').pipe(
        tap( resp => {
          this.players = this.players.filter( p => p !== resp.data);
        })
    ).subscribe();

    this.socketService.getMessages$('player-join').pipe(
        tap( resp => {
          this.players.push(resp.data);
        })
    ).subscribe();

    this.socketService.getMessages$('go-to-start').pipe(
      tap( () => this.router.navigate(['play', this.roomId]))
    ).subscribe();
  }

  startGame() {
    this.socketService.sendMessage('init-game', undefined);
  }
}
