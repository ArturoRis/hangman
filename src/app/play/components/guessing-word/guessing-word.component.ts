import { Component, OnDestroy, OnInit } from '@angular/core';
import { LettersService } from '../../services/letters.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HangmanService } from '../hangman/hangman.service';

@Component({
  selector: 'hmo-guessing-word',
  templateUrl: './guessing-word.component.html',
  styleUrls: ['./guessing-word.component.scss']
})
export class GuessingWordComponent implements OnInit, OnDestroy {
  lettersInfo: LetterInfo[] = [];

  private sub = new Subscription();


  constructor(
    private gameKeyboardService: LettersService,
    private hangmanService: HangmanService,
  ) {
    this.setWord('Parola di test');
  }

  ngOnInit(): void {
    this.sub.add(
      this.gameKeyboardService.getLetters$().pipe(
        tap(letter => this.checkLetter(letter))
      ).subscribe()
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkLetter(letter: string) {
    const letterInfo = this.lettersInfo.filter(l => l.letter === letter);
    if (letterInfo && letterInfo.length) {
      letterInfo.forEach(l => l.isGuessed = true);
    } else {
      this.hangmanService.sendError();
    }
  }

  setWord(word: string) {
    this.lettersInfo = [];
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
