import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GameStateService } from '../../services/game-state.service';
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
  itsMe: boolean;

  private numOfErrors = 0;

  constructor(
    private gameStateService: GameStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameStateService.getErrors$().pipe(
        tap(() => this.addError())
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getStatus$().pipe(
        tap(status => {
          if (status && status !== 'lose') {
            this.showWin = status;
            this.itsMe = status === this.gameStateService.currentUser;
          }
        })
      ).subscribe()
    );
  }

  addError() {
    this.numOfErrors += 1;
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
