import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent extends BaseComponent implements OnInit {

  BUTTONS: GKButton[] = [];
  hideGameKeyboard: Observable<boolean>;
  showGameKeyboard: Observable<boolean>;

  constructor(
    private gameStateService: GameStateService
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
    this.hideGameKeyboard = this.gameStateService.getStatus$().pipe(
      map((status) => !!status)
    );

    this.showGameKeyboard = this.gameStateService.getStatus$().pipe(
      map((status) => !status)
    );

    this.addSubscription(
      this.gameStateService.getNewGuess$().pipe(
        tap(key => this.disableButton(key))
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getGuesses$().pipe(
        first(),
        tap(guesses => guesses.forEach(key => this.disableButton(key)))
      ).subscribe()
    );
  }

  buttonClicked(key: string) {
    this.gameStateService.sendLetter(key);
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
}

interface GKButton {
  key: string;
  isDisabled: boolean;
}
