import { Component, OnInit } from '@angular/core';
import { GameService } from '../../state/game.service';
import { BaseDirective } from '../../../core/base-objects/base.directive';

@Component({
  selector: 'hmo-choose-word',
  templateUrl: './choose-word.component.html',
  styleUrls: ['./choose-word.component.scss']
})
export class ChooseWordComponent extends BaseDirective implements OnInit {

  word?: string;

  constructor(
    private gameService: GameService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  chooseWord(): void {
    if (!this.word) {
      return;
    }
    this.gameService.setWord(this.word).subscribe();
  }
}
