import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../../services/player-info.service';
import { BaseComponent } from '../../base-objects/base-component';

@Component({
  selector: 'hmo-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent extends BaseComponent implements OnInit {

  roomId: string;
  name: string;

  constructor(
    private socketService: SocketService,
    private router: Router,
    private playerInfoService: PlayerInfoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.name = this.playerInfoService.getName();
  }

  createRoom() {
    this.socketService.sendMessage(
      'create-room',
      this.name,
      ({data}) => this.goToRoom(data));
  }

  joinRoom() {
    this.goToRoom(this.roomId);
  }

  goToRoom(roomId) {
    this.playerInfoService.setName(this.name);
    this.router.navigate(['game', roomId]);
  }
}
