import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GameQuery } from '../../state/game.query';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent extends BaseComponent implements OnInit {

  firstError = false;
  secondError = false;
  thirdError = false;
  fourthError = false;
  fifthError = false;
  sixthError = false;
  showWin: string;

  private numOfErrors = 0;

  constructor(
    private gameQuery: GameQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameQuery.getErrors$().pipe(
        tap((error) => this.setError(error))
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getStatus$().pipe(
        tap(status => {
          if (status && status !== 'lose') {
            this.showWin = this.gameQuery.players.find(p => p.id === status).name;
          } else {
            this.showWin = undefined;
          }
        })
      ).subscribe()
    );
  }

  setError(error: number) {
    this.numOfErrors = error;
    this.showError(this.numOfErrors);
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
