import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'hmo-choose-word',
  templateUrl: './choose-word.component.html',
  styleUrls: ['./choose-word.component.scss']
})
export class ChooseWordComponent implements OnInit {

  word: string;
  constructor(
    private gameStateService: GameStateService
  ) { }

  ngOnInit(): void {
  }

  chooseWord() {
    this.gameStateService.setWord(this.word);
  }
}
