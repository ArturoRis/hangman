import { Component, OnInit } from '@angular/core';
import { SocketResponse, SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hmo-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent implements OnInit {

  roomId: string;
  error: string;

  constructor(
    private socketService: SocketService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  createRoom() {
    this.socketService.sendMessage(
      'create-room',
      undefined,
      ({data}) => this.goToRoom(data));
  }

  joinRoom() {
    this.error = undefined;
    this.socketService.sendMessage<any>(
      'join-room',
      this.roomId,
      (resp) => {
        if (resp.ok) {
          this.goToRoom(resp.data && resp.data.id);
        } else {
          this.error = resp.data;
        }
      }
    );
  }

  goToRoom(roomId) {
    this.router.navigate(['room', roomId]);
  }
}
