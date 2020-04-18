import { Component, OnInit } from '@angular/core';
import { LettersService } from '../../services/letters.service';

@Component({
  selector: 'hmo-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent implements OnInit {

  BUTTONS: GKButton[] = [];

  constructor(
    private gameKeyboardService: LettersService
  ) {
    for (let c = 65; c < 91; c++) {
      this.BUTTONS.push({
        key: String.fromCharCode(c),
        isDisabled: false
      });
    }
  }

  ngOnInit(): void {
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
