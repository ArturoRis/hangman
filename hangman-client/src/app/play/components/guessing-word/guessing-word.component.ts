import { Component, OnDestroy, OnInit } from '@angular/core';
import { LettersService } from '../../services/letters.service';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HangmanService } from '../hangman/hangman.service';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-guessing-word',
  templateUrl: './guessing-word.component.html',
  styleUrls: ['./guessing-word.component.scss']
})
export class GuessingWordComponent extends BaseComponent implements OnInit {
  lettersInfo: LetterInfo[] = [];

  private currentWord: string;


  constructor(
    private gameKeyboardService: LettersService,
    private hangmanService: HangmanService,
    private gameStateService: GameStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameKeyboardService.getLetters$().pipe(
        tap(letter => this.checkLetter(letter))
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getState$().pipe(
        filter(state => !!state.currentWord && this.currentWord != state.currentWord),
        tap(state => this.setWord(state.currentWord))
      ).subscribe()
    );
  }

  checkLetter(letter: string) {
    const letterInfo = this.lettersInfo.filter(l => l.letter === letter);
    if (letterInfo && letterInfo.length) {
      letterInfo.forEach(l => l.isGuessed = true);
    } else {
      this.hangmanService.sendError();
    }

    this.checkWin();
  }

  checkWin() {
    if (this.lettersInfo.every(letterInfo => letterInfo.isGuessed)) {
      this.gameStateService.finishGame(true);
    }
  }

  setWord(word: string) {
    this.lettersInfo = [];
    this.currentWord = word;
    for (const c of word.toUpperCase()) {
      this.lettersInfo.push({
        letter: c === ' ' ? undefined : c,
        isGuessed: false
      });
    }
  }
}

interface LetterInfo {
  letter: string;
  isGuessed: boolean;
}
