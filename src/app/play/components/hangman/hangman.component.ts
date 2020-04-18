import { Component, OnDestroy, OnInit } from '@angular/core';
import { HangmanService } from '../../services/hangman.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hmo-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnDestroy {

  firstError = false;
  secondError = false;
  thirdError = false;
  fourthError = false;
  fifthError = false;
  sixthError = false;

  private sub = new Subscription();

  constructor(
    private hangmanService: HangmanService
  ) {
  }

  ngOnInit(): void {
    this.sub.add(this.hangmanService.getErrors$().pipe(
      tap(error => this.showError(error))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showError(error: HangmanError) {
    // tslint:disable:no-switch-case-fall-through
    switch (error) {
      case HangmanError.SIXTH:
        this.sixthError = true;
      case HangmanError.FIFTH:
        this.fifthError = true;
      case HangmanError.FOURTH:
        this.fourthError = true;
      case HangmanError.THIRD:
        this.thirdError = true;
      case HangmanError.SECOND:
        this.secondError = true;
      case HangmanError.FIRST:
        this.firstError = true;
    }
  }
}

export enum HangmanError {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  SIXTH = 6
}
