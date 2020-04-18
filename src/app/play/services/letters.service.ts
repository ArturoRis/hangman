import { Injectable } from '@angular/core';
import { BaseChannelService } from '../../core/base-objects/base-channel-service';

@Injectable()
export class LettersService extends BaseChannelService<string> {

  sendLetter(key: string) {
    this.sendEvent(key);
  }

  getLetters$() {
    return this.getChannel$();
  }
}
