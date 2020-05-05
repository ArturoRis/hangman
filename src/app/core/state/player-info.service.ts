import { Injectable } from '@angular/core';
import { PlayerInfoStore } from './player-info.store';
import { SocketService } from '../services/socket.service';

@Injectable({ providedIn: 'root' })
export class PlayerInfoService {

  constructor(
    private playerInfoStore: PlayerInfoStore,
              private socketService: SocketService
  ) {
    this.playerInfoStore.updateId(this.socketService.getId());
  }

  setName(name: string) {
    this.playerInfoStore.updateName(name);
  }
}
