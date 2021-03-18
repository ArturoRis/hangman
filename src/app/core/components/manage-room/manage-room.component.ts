import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../../state/player-info.service';
import { PlayerInfoQuery } from '../../state/player-info.query';
import { BaseDirective } from '../../base-objects/base.directive';
import { RoomService } from '../../services/room.service';
import { DataLoaderObservable } from '../../../utils/data-loader.observable';

@Component({
  selector: 'hmo-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent extends BaseDirective implements OnInit {

  roomId?: string;
  name: string;
  createRoomLoader?: DataLoaderObservable<string>;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private playerInfoQuery: PlayerInfoQuery,
    private playerInfoService: PlayerInfoService
  ) {
    super();
    this.name = this.playerInfoQuery.getName();
  }

  ngOnInit(): void {
  }

  createRoom(): void {
    this.createRoomLoader = new DataLoaderObservable(this.roomService.createRoom(this.name));
    this.createRoomLoader.subscribe( roomId => this.goToRoom(roomId));
  }

  joinRoom(): void {
    if (!this.roomId) {
      return;
    }
    this.goToRoom(this.roomId);
  }

  goToRoom(roomId: string): void {
    this.playerInfoService.setName(this.name);
    this.router.navigate(['game', roomId]);
  }
}
