import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { Injectable } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class TurnService extends BaseChannelService<string> {
  currentUser: string;
  private turnSub: Subscription;

  constructor(
    private socketService: SocketService,
  ) {
    super();
    this.currentUser = this.socketService.getId();
  }

  receiveTurns() {
    if (this.turnSub) {
      this.turnSub.unsubscribe();
    }
    this.turnSub = this.socketService.getMessages$('new-turn').pipe(
      tap((resp: any) => this.setTurn(resp.data))
    ).subscribe();
  }

  private setTurn(user: string) {
    this.sendEvent(user);
  }

  getCurrentTurn$() {
    return this.getChannel$();
  }

  start() {
    this.receiveTurns();
    this.socketService.sendMessage('get-current-turn', undefined, (resp) => {
      this.setTurn(resp.data);
    });
  }
}
