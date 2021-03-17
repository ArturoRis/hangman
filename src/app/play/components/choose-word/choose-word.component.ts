import { Component, OnInit } from '@angular/core';
import { GameService } from '../../state/game.service';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-choose-word',
  templateUrl: './choose-word.component.html',
  styleUrls: ['./choose-word.component.scss']
})
export class ChooseWordComponent extends BaseComponent implements OnInit {

  word: string;

  constructor(
    private gameService: GameService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  chooseWord() {
    this.gameService.setWord(this.word).subscribe();
  }
}
