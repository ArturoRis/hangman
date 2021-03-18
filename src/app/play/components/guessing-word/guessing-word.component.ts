import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { GameQuery } from '../../state/game.query';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-guessing-word',
  templateUrl: './guessing-word.component.html',
  styleUrls: ['./guessing-word.component.scss']
})
export class GuessingWordComponent extends BaseDirective implements OnInit {
  lettersInfo$: Observable<LetterInfo[]>;

  constructor(
    private gameQuery: GameQuery
  ) {
    super();
    this.lettersInfo$ = this.gameQuery.getWord$().pipe(
      filter(word => !!word && !!word.length)
    );
  }

  ngOnInit(): void {
  }
}

interface LetterInfo {
  letter?: string;
  isGuessed: boolean;
}
