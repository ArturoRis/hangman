import { Component, OnInit } from '@angular/core';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { filter, first, map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PlayerInfoQuery } from '../../../core/state/player-info.query';

@Component({
  selector: 'hmo-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent extends BaseComponent implements OnInit {

  BUTTONS: GKButton[] = [];
  showRestart: Observable<boolean>;
  showGameKeyboard: Observable<boolean>;
  showWin: string | boolean;
  itsMe: boolean;

  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery,
    private playerInfoQuery: PlayerInfoQuery
  ) {
    super();
    for (let c = 65; c < 91; c++) {
      this.BUTTONS.push({
        key: String.fromCharCode(c),
        isDisabled: false
      });
    }
  }

  ngOnInit(): void {
    this.enableAllButtons();

    this.showGameKeyboard = this.gameQuery.getStatus$().pipe(
      map((status) => !status)
    );

    this.showRestart = combineLatest([
      this.showGameKeyboard,
      this.gameQuery.getMaster$()
    ]).pipe(
      map(([showGameKeyboard, master]) => !showGameKeyboard && this.playerInfoQuery.getId() === master)
    );

    this.addSubscription(
      this.gameQuery.getNewGuess$().pipe(
        filter(guess => !!guess),
        tap(({letter}) => this.disableButton(letter))
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getGuesses$().pipe(
        first(),
        tap(guesses => {
          this.enableAllButtons();
          guesses.forEach(key => this.disableButton(key.letter));
        })
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getStatus$().pipe(
        tap(status => {
          this.itsMe = undefined;
          this.showWin = undefined;
          if (status && status !== 'lose') {
            this.showWin = this.gameQuery.players.find(p => p.id === status).name;
            this.itsMe = status === this.playerInfoQuery.getId();
          } else if (status === 'lose') {
            this.showWin = false;
          }
        })
      ).subscribe()
    );

  }

  buttonClicked(key: string) {
    this.gameService.sendLetter(key);
    this.disableButton(key);
  }

  disableButton(key: string) {
    const button = this.BUTTONS.find(b => b.key === key);
    if (button) {
      button.isDisabled = true;
    }
  }

  restartGame() {
    this.gameService.restartGame();
  }

  private enableAllButtons() {
    this.BUTTONS.forEach( b => b.isDisabled = false);
  }
}

interface GKButton {
  key: string;
  isDisabled: boolean;
}
