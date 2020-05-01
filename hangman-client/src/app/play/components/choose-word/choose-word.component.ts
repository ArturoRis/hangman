import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-choose-word',
  templateUrl: './choose-word.component.html',
  styleUrls: ['./choose-word.component.scss']
})
export class ChooseWordComponent extends BaseComponent implements OnInit {

  word: string;

  constructor(
    private gameStateService: GameStateService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  chooseWord() {
    this.gameStateService.setWord(this.word);
  }
}
