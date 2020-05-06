import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GameState, GameStore, GuessInfo, LetterInfo, PlayerInfo, Status } from './game.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerInfoQuery } from '../../core/state/player-info.query';

@Injectable({providedIn: 'root'})
export class GameQuery extends Query<GameState> {

  constructor(
    protected store: GameStore,
    protected playerInfoQuery: PlayerInfoQuery
  ) {
    super(store);
  }

  get players(): PlayerInfo[] {
    return this.getValue().players;
  }

  getStatus$(): Observable<Status> {
    return this.select('status');
  }

  getNewGuess$(): Observable<GuessInfo> {
    return this.select('newGuess');
  }

  getGuesses$(): Observable<GuessInfo[]> {
    return this.select('guesses');
  }

  getErrors$(): Observable<number> {
    return this.select('errors');
  }

  getWord$(): Observable<LetterInfo[]> {
    return this.select('currentWord');
  }

  getCurrentTurn$(): Observable<string> {
    return this.select('currentTurn');
  }

  getMaster$(): Observable<string> {
    return this.select('master');
  }

  getPlayers$(): Observable<PlayerInfo[]> {
    return this.select('players');
  }

  getId$(): Observable<string> {
    return this.select('id');
  }

  getWordGuesses$(): Observable<string[]> {
    return this.select('wordGuesses');
  }

  getAmIMaster$(): Observable<boolean> {
    return this.getMaster$().pipe(
      // The 'id' does NOT change in time
      map(master => this.playerInfoQuery.getId() === master)
    );
  }
}
