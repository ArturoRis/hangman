import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { tap } from 'rxjs/operators';
import { SocketService } from '../../core/services/socket.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GameStateService extends BaseChannelService<GameState> {
  private INITIAL_STATE: GameState = {
    currentWord: undefined,
    lettersUsed: [],
    status: undefined,
  };

  private currentState: GameState;

  constructor(
    private socketService: SocketService
  ) {
    super();
    this.getChannel$().pipe(
      tap((state) => this.currentState = state)
    ).subscribe();
    this.socketService.getMessages$('start-game').pipe(
      tap(() => this.sendEvent(this.INITIAL_STATE))
    ).subscribe();

    this.socketService.getMessages$('finish-game').pipe(
      tap((resp: any) => {
        this.sendEvent({
          ...this.currentState,
          status: resp.data ? 'current user' : 'lose'
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
  }

  startGame() {
    this.socketService.sendMessage('start-game', null);

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
