import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { SocketService } from '../../core/services/socket.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GameStateService implements OnDestroy {

  // Actions are implicit everywhere, they are the methods

  private channel: BehaviorSubject<GameState> = new BehaviorSubject({
    status: null,
    currentWord: [],
    currentTurn: null,
    errors: 0,
    guesses: [],
    id: null,
    master: null,
    newGuess: null,
    players: []
  });
  private sub = new Subscription();

  constructor(
    private socketService: SocketService,
    private router: Router
  ) {
    this.registerActions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get state() {
    return this.channel.value;
  }

  private updateState(update: Partial<GameState>) {
    const newState = {
      ...this.channel.value,
      ...update
    };
    this.channel.next(newState);
  }

  startGame(state: GameState) {
    this.updateState(state);
  }

  // Reducers
  registerActions() {

    this.sub.add(
      this.socketService.getMessages$<{ player: PlayerInfo, master: string }>('player-leave').pipe(
        tap(({data: {player, master}}) => {
          const update: Partial<GameState> = {};
          update.players = this.state.players.filter(p => p.id !== player.id);
          if (master) {
            update.master = master;
          }
          this.updateState(update);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<PlayerInfo>('player-join').pipe(
        tap(({data: player}) => {
          const players = [...this.state.players, player];

          this.updateState({players});
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GameState>('go-to-start').pipe(
        tap(({data: state}) => {
          this.updateState(state);
          this.router.navigate(['game', state.id, 'play']);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<Status>('finish-game').pipe(
        tap(({data: status}) => {
          this.updateState({status});
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<LetterInfo[]>('set-word').pipe(
        tap(({data: currentWord}) => {
          this.updateState({currentWord});
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GameState>('restart-game').pipe(
        tap(({data: state}) => {
          this.updateState({...state, newGuess: null});
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GuessInfo>('new-guess').pipe(
        tap(({data: guessInfo}) => {
          const update: Partial<GameState> = {};
          if (guessInfo.ids && guessInfo.ids.length) {
            update.currentWord = this.state.currentWord
              .map(l => {
                const newLetter = {...l};
                if (guessInfo.ids.includes(l.id)) {
                  newLetter.isGuessed = true;
                  newLetter.letter = guessInfo.letter;
                }
                return newLetter;
              });
          } else {
            update.errors = this.state.errors + 1;
          }
          update.newGuess = guessInfo;
          update.guesses = this.state.guesses.concat([guessInfo]);
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

  // Actions
  setWord(word: string) {
    this.socketService.sendMessage('set-word', word);
  }

  restartGame() {
    this.socketService.sendMessage('restart-game', undefined);
  }

  sendLetter(key: string) {
    this.socketService.sendMessage('new-guess', key);
  }

  initGame() {
    this.socketService.sendMessage('init-game', undefined);
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

  getNewGuess$(): Observable<GuessInfo> {
    return this.getState$().pipe(
      pluck('newGuess'),
      distinctUntilChanged()
    );
  }

  getGuesses$(): Observable<GuessInfo[]> {
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

  getMaster$(): Observable<string> {
    return this.getState$().pipe(
      pluck('master'),
      distinctUntilChanged()
    );
  }

  getPlayers$(): Observable<PlayerInfo[]> {
    return this.getState$().pipe(
      pluck('players'),
      distinctUntilChanged()
    );
  }

  getId$(): Observable<string> {
    return this.getState$().pipe(
      pluck('id'),
      distinctUntilChanged()
    );
  }
}

export interface GameState {
  id: string;
  currentWord: LetterInfo[];
  newGuess: GuessInfo;
  guesses: GuessInfo[];
  status: Status;
  errors: number;
  master: string; // The id of the player that is the game master
  currentTurn: string; // The id of the player whose has the current turn
  players: PlayerInfo[];
}

export type Status = string | 'lose' | null;

export interface LetterInfo {
  id: string;
  letter: string;
  isGuessed: boolean;
}

export interface GuessInfo {
  letter: string;
  ids: string[]; // if present are the id of the LetterInfo of which this letter is the answer
}

export interface PlayerInfo {
  id: string;
  name: string;
  points: number;
}
