import { Injectable } from '@angular/core';
import { BaseChannelService } from '../../../core/base-objects/base-channel-service';

@Injectable()
export class HangmanService extends BaseChannelService<void> {

  sendError() {
    this.sendEvent();
  }

  getErrors$() {
    return this.getChannel$();
  }
}
