import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, Store, StoreConfig } from '@datorama/akita';

export interface GameState {
  id: string;
  currentWord: LetterInfo[];
  newGuess: GuessInfo;
  guesses: GuessInfo[];
  wordGuesses: string[];
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


export function createInitialState(): GameState {
  return {
    status: null,
    currentWord: [],
    currentTurn: null,
    wordGuesses: [],
    errors: 0,
    guesses: [],
    id: null,
    master: null,
    newGuess: null,
    players: []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'game'})
export class GameStore extends Store<GameState> {

  constructor() {
    super(createInitialState());
  }

  private get players(): PlayerInfo[] {
    return this.getValue().players;
  }

  private get guesses(): GuessInfo[] {
    return this.getValue().guesses;
  }

  private get errors(): number {
    return this.getValue().errors;
  }

  private get currentWord(): LetterInfo[] {
    return this.getValue().currentWord;
  }

  removePlayer(playerInfo: PlayerInfo) {
    this.update({
      players: arrayRemove(this.players, playerInfo.id)
    });
  }

  updateMaster(master: string) {
    this.update({master});
  }

  addPlayer(playerInfo: PlayerInfo) {
    this.update({
      players: arrayAdd(this.players, playerInfo)
    });
  }

  updateStatus(status: Status) {
    this.update({status});
  }

  updateCurrentWord(currentWord: LetterInfo[]) {
    this.update({currentWord});
  }

  addGuess(guessInfo: GuessInfo) {
    const stateUpdate: Partial<GameState> = {
      guesses: arrayAdd(this.guesses, guessInfo),
      newGuess: guessInfo
    };
    if (guessInfo.ids && guessInfo.ids.length) {
      stateUpdate.currentWord = arrayUpdate(
        this.currentWord,
        guessInfo.ids,
        {isGuessed: true, letter: guessInfo.letter}
      );
    } else {
      stateUpdate.errors = this.errors + 1;
    }
    this.update(stateUpdate);
  }

  updateTurn(currentTurn: string) {
    this.update({currentTurn});
  }

  updateWordGuesses(wordGuesses: string[]) {
    this.update({wordGuesses});
  }
}
