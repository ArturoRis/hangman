import { Injectable } from '@angular/core';
import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { SocketService } from '../../core/services/socket.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LettersService extends BaseChannelService<string> {

  constructor(
    private socketService: SocketService
  ) {
    super();
    this.socketService.getMessages$('new-guess').pipe(
      tap( (newKey: any) => {
        this.sendEvent(newKey.data);
      })
    ).subscribe();
  }

  sendLetter(key: string) {
    this.socketService.sendMessage('new-guess', key);

  }

  getLetters$() {
    return this.getChannel$();
  }
}
