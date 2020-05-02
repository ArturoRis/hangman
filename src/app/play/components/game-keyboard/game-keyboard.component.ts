import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { filter, first, map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PlayerInfoService } from '../../../core/services/player-info.service';

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
    private gameStateService: GameStateService,
    private playerInfoService: PlayerInfoService
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

    this.showGameKeyboard = this.gameStateService.getStatus$().pipe(
      map((status) => !status)
    );

    this.showRestart = combineLatest([
      this.showGameKeyboard,
      this.gameStateService.getMaster$()
    ]).pipe(
      map(([showGameKeyboard, master]) => !showGameKeyboard && this.playerInfoService.getId() === master)
    );

    this.addSubscription(
      this.gameStateService.getNewGuess$().pipe(
        filter(guess => !!guess),
        tap(({letter}) => this.disableButton(letter))
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getGuesses$().pipe(
        first(),
        tap(guesses => {
          this.enableAllButtons();
          guesses.forEach(key => this.disableButton(key.letter));
        })
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getStatus$().pipe(
        tap(status => {
          this.itsMe = undefined;
          this.showWin = undefined;
          if (status && status !== 'lose') {
            this.showWin = this.gameStateService.state.players.find(p => p.id === status).name;
            this.itsMe = status === this.playerInfoService.getId();
          } else if (status === 'lose') {
            this.showWin = false;
          }
        })
      ).subscribe()
    );

  }

  buttonClicked(key: string) {
    this.gameStateService.sendLetter(key);
    this.disableButton(key);
  }

  disableButton(key: string) {
    const button = this.BUTTONS.find(b => b.key === key);
    if (button) {
      button.isDisabled = true;
    }
  }

  restartGame() {
    this.gameStateService.restartGame();
  }

  private enableAllButtons() {
    this.BUTTONS.forEach( b => b.isDisabled = false);
  }
}

interface GKButton {
  key: string;
  isDisabled: boolean;
}
