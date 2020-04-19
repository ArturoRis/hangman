import { BaseChannelService } from '../base-objects/base-channel-service';

export class TurnService extends BaseChannelService<string> {
  currentUser: string;

  setNickname(nickname: string) {
    this.currentUser = nickname;
  }

  setTurn(user: string) {
    this.sendEvent(user);
  }

  getCurrentTurn$() {
    return this.getChannel$();
  }
}
