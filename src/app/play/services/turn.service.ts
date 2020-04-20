import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { Injectable } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { GameStateService } from './game-state.service';
import { distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class TurnService extends BaseChannelService<string> {
  currentUser: string;
  turnSub: Subscription;

  constructor(
    private socketService: SocketService,
    private gameStateService: GameStateService
  ) {
    super();
    this.gameStateService.getState$().pipe(
      filter(state => !state.status),
      distinctUntilChanged(),
      tap(() => this.receiveTurns())
    ).subscribe();

    this.socketService.getMessages$('get-nickname').pipe(
      tap( (nick: any) => {
        if(nick.ok) {
          this.currentUser = nick.data;
        }
      })
    ).subscribe();

    this.socketService.sendMessage('get-nickname', null);
  }

  receiveTurns() {
    if (this.turnSub) {
      this.turnSub.unsubscribe();
    }
    this.turnSub = this.socketService.getMessages$('new-turn').pipe(
      tap((resp: any) => this.setTurn(resp.data))
    ).subscribe();
  }

  setNickname(nickname: string) {
    this.currentUser = nickname;

    const msgType = 'set-nickname';
    this.socketService.sendMessage(msgType, nickname);

    return this.socketService.getMessages$(msgType).pipe(
      take(1)
    );
  }

  setTurn(user: string) {
    this.sendEvent(user);
  }

  getCurrentTurn$() {
    return this.getChannel$();
  }
}
