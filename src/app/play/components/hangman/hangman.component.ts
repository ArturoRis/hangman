import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GameQuery } from '../../state/game.query';
import { BaseDirective } from '../../../core/base-objects/base.directive';

@Component({
  selector: 'hmo-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent extends BaseDirective implements OnInit {

  firstError = false;
  secondError = false;
  thirdError = false;
  fourthError = false;
  fifthError = false;
  sixthError = false;
  showWin?: string;

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
            this.showWin = this.gameQuery.players.find(p => p.id === status)?.name;
          } else {
            this.showWin = undefined;
          }
        })
      ).subscribe()
    );
  }

  setError(error: number): void {
    this.numOfErrors = error;
    this.showError(this.numOfErrors);
  }

  showError(error: HangmanError): void {
    // tslint:disable:no-switch-case-fall-through
    switch (error) {
      // @ts-ignore
      case HangmanError.SIXTH:
        this.sixthError = true;
      // @ts-ignore
      case HangmanError.FIFTH:
        this.fifthError = true;
      // @ts-ignore
      case HangmanError.FOURTH:
        this.fourthError = true;
      // @ts-ignore
      case HangmanError.THIRD:
        this.thirdError = true;
      // @ts-ignore
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
