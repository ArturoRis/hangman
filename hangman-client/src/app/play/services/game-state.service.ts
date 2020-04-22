import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { tap } from 'rxjs/operators';
import { SocketService } from '../../core/services/socket.service';
import { Injectable } from '@angular/core';
import { TurnService } from './turn.service';

@Injectable()
export class GameStateService extends BaseChannelService<GameState> {
  private INITIAL_STATE: GameState = {
    currentWord: undefined,
    lettersUsed: [],
    status: undefined,
  };

  private currentState: GameState;

  constructor(
    private socketService: SocketService,
    private turnService: TurnService
  ) {
    super();
  }

  startGame() {
    this.getChannel$().pipe(
      tap((state) => this.currentState = state)
    ).subscribe();

    this.socketService.getMessages$('finish-game').pipe(
      tap((resp: any) => {
        this.sendEvent({
          ...this.currentState,
          status: resp.data.isWin ? resp.data.who : 'lose'
        });
      })
    ).subscribe();

    this.socketService.getMessages$('set-word').pipe(
      tap((resp: any) => {
        this.sendEvent({
          ...this.currentState,
          currentWord: resp.data
        });
      })
    ).subscribe();

    this.sendEvent(this.INITIAL_STATE);
    this.turnService.start();
  }

  finishGame(win: boolean) {
    this.socketService.sendMessage('finish-game', win);
  }

  setWord(word: string) {
    this.socketService.sendMessage('set-word', word);

  }

  getState$() {
    return this.getChannel$();
  }
}

export interface GameState {
  currentWord: string;
  lettersUsed: string[];
  status: string | 'lose' | undefined;
}
