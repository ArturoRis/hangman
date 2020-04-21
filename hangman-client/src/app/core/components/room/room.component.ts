import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.params.ID;
    this.socketService.sendMessage('get-room', roomId, (resp) => {
      console.log('get-room', resp);
    });
  }

}
