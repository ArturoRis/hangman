import { BaseChannelService } from '../base-objects/base-channel-service';
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable()
export class TurnService extends BaseChannelService<string> {
  currentUser: string;

  constructor(
    private socketService: SocketService
  ) {
    super();
  }

  setNickname(nickname: string) {
    this.currentUser = nickname;

    const msgType = 'set-nickname';
    this.socketService.sendMessage(msgType, nickname);

    return this.socketService.getMessages$(msgType);
  }

  setTurn(user: string) {
    this.sendEvent(user);
  }

  getCurrentTurn$() {
    return this.getChannel$();
  }
}
