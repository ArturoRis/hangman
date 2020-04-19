import { Component, OnDestroy, OnInit } from '@angular/core';
import { HangmanService } from './hangman.service';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { TurnService } from '../../../core/services/turn.service';

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
    private hangmanService: HangmanService,
    private gameStateService: GameStateService,
    private turnService: TurnService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.hangmanService.getErrors$().pipe(
        tap(() => this.addError())
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getState$().pipe(
        filter( state => state.status && state.status !== 'lose'),
        tap( state => {
          this.showWin = state.status;
          this.itsMe = state.status === this.turnService.currentUser;
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
        this.loseGame();
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

  loseGame() {
    this.gameStateService.finishGame(false);
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
