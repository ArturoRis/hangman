import { Component, OnInit } from '@angular/core';
import { LettersService } from '../../services/letters.service';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'hmo-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent extends BaseComponent implements OnInit {

  BUTTONS: GKButton[] = [];
  hideGameKeyboard: boolean;

  constructor(
    private gameKeyboardService: LettersService,
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
    this.addSubscription(
      this.gameStateService.getState$().pipe(
        filter( state => !!state.status),
        tap( () => this.hideGameKeyboard = true)
      ).subscribe()
    );
  }

  buttonClicked(key: string) {
    this.gameKeyboardService.sendLetter(key);
    this.disableButton(key);
  }

  disableButton(key: string) {
    const button = this.BUTTONS.find(b => b.key === key);
    if (button) {
      button.isDisabled = true;
    }
  }
}

interface GKButton {
  key: string;
  isDisabled: boolean;
}
