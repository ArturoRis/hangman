import { BaseChannelService } from '../../core/base-objects/base-channel-service';
import { tap } from 'rxjs/operators';

export class GameStateService extends BaseChannelService<GameState> {
  private INITIAL_STATE: GameState = {
    currentWord: undefined,
    lettersUsed: [],
    status: undefined,
  };

  private currentState: GameState;

  constructor() {
    super();
    this.getChannel$().pipe(
      tap((state) => this.currentState = state)
    ).subscribe();
  }

  startGame() {
    this.sendEvent(this.INITIAL_STATE);
  }

  finishGame(win: boolean) {
    this.sendEvent({
      ...this.currentState,
      status: win ? 'current user' : 'lose'
    });
  }

  setWord(word: string) {
    this.sendEvent({
      ...this.currentState,
      currentWord: word
    });
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
