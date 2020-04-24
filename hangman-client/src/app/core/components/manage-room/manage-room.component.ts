import { Component, OnInit } from '@angular/core';
import { SocketResponse, SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'hmo-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent implements OnInit {

  roomId: string;
  name: string;

  constructor(
    private socketService: SocketService,
    private playersService: PlayersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  createRoom() {
    this.playersService.setName(this.name);
    this.socketService.sendMessage(
      'create-room',
      name,
      ({data}) => this.goToRoom(data));
  }

  joinRoom() {
    this.playersService.setName(this.name);
    this.goToRoom(this.roomId);
  }

  goToRoom(roomId) {
    this.router.navigate(['room', roomId]);
  }
}
