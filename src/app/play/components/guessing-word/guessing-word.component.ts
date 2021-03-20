import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { GameQuery } from '../../state/game.query';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-guessing-word',
  templateUrl: './guessing-word.component.html',
  styleUrls: ['./guessing-word.component.scss']
})
export class GuessingWordComponent extends BaseDirective implements OnInit {
  letters$: Observable<string[]>;

  constructor(
    private gameQuery: GameQuery
  ) {
    super();
    this.letters$ = this.gameQuery.getWord$().pipe(
      filter(word => !!word && !!word.length),
      map( letters => letters.map( l => {
        if (!l) {
          return ' ';
        }
        if (!l.isGuessed) {
          return '_';
        }
        return l.letter;
      }))
    );
  }

  ngOnInit(): void {
  }
}

interface LetterInfo {
  letter?: string;
  isGuessed: boolean;
}
