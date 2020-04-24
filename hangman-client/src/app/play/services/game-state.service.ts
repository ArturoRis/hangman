import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { SocketService } from '../../core/services/socket.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class GameStateService {

  // Actions are implicit everywhere, they are the methods

  private channel: BehaviorSubject<GameState>;
  private sub = new Subscription();
  public currentUser: string;

  constructor(
    private socketService: SocketService
  ) {
    this.currentUser = this.socketService.getId();
    const state = JSON.parse(localStorage.getItem('hmo-game-state'));
    localStorage.removeItem('hmo-game-state');
    this.startGame(state);
  }

  get state() {
    return this.channel.value;
  }

  private updateState(update: Partial<GameState>) {
    const newState = {
      ...this.channel.value,
      update
    };
    this.channel.next(newState);
  }

  startGame(state: GameState) {
    this.updateState(state);

    this.registerActions();
  }

  // Reducers
  registerActions() {
    this.sub.add(
      this.socketService.getMessages$<Status>('finish-game').pipe(
        tap((resp: any) => {
          this.updateState({
            status: resp.data.isWin ? resp.data.who : 'lose'
          });
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<LetterInfo[]>('set-word').pipe(
        tap((resp) => {
          this.updateState({
            currentWord: resp.data
          });
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GameState>('restart-game').pipe(
        tap(resp => {
          this.updateState(resp.data);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<LetterInfo>('new-guess').pipe(
        tap(({data: letterInfo}) => {
          const update: Partial<GameState> = {};
          if (letterInfo.isGuessed) {
            update.currentWord = this.state.currentWord.map(
              l => l.id === letterInfo.id ? letterInfo : l
            );
          } else {
            update.errors = this.state.errors + 1;
          }
          update.newGuess = letterInfo.letter;
          update.guesses = this.state.guesses.concat([letterInfo.letter]);
          this.updateState(update);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$('new-turn').pipe(
        tap(({data: currentTurn}) => this.updateState({currentTurn}))
      ).subscribe()
    );
  }

  // Effects
  setWord(word: string) {
    this.socketService.sendMessage('set-word', word);
  }

  restartGame() {
    this.socketService.sendMessage('restart-game', undefined);
  }

  sendLetter(key: string) {
    this.socketService.sendMessage('new-guess', key);
  }

  // Selectors
  getState$() {
    return this.channel.asObservable();
  }

  getStatus$(): Observable<Status> {
    return this.getState$().pipe(
      pluck('status'),
      distinctUntilChanged()
    );
  }

  getNewGuess$(): Observable<string> {
    return this.getState$().pipe(
      pluck('newGuess'),
      distinctUntilChanged()
    );
  }

  getGuesses$(): Observable<string[]> {
    return this.getState$().pipe(
      pluck('guesses'),
      distinctUntilChanged()
    );
  }

  getErrors$(): Observable<number> {
    return this.getState$().pipe(
      pluck('errors'),
      distinctUntilChanged()
    );
  }

  getWord$(): Observable<LetterInfo[]> {
    return this.getState$().pipe(
      pluck('currentWord'),
      distinctUntilChanged()
    );
  }

  getCurrentTurn$(): Observable<string> {
    return this.getState$().pipe(
      pluck('currentTurn'),
      distinctUntilChanged()
    );
  }
}

export interface GameState {
  currentWord: LetterInfo[];
  newGuess: string;
  guesses: string[];
  status: Status;
  errors: number;
  master: string; // The id of the player that is the game master
  currentTurn: string; // The id of the player whose has the current turn
}

export type Status = string | 'lose' | undefined;

export interface LetterInfo {
  id: string;
  letter: string;
  isGuessed: boolean;
}
