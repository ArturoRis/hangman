import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GameQuery } from '../../state/game.query';

@Component({
  selector: 'hmo-guess-viewer',
  templateUrl: './guess-viewer.component.html',
  styleUrls: ['./guess-viewer.component.scss']
})
export class GuessViewerComponent implements OnInit {

  lettersNotGuessed$: Observable<string[]>;

  constructor(
    private gameQuery: GameQuery
  ) {
    this.lettersNotGuessed$ = this.gameQuery.getGuesses$().pipe(
      map( guesses => guesses
        .filter( g => !g.ids || !g.ids.length)
        .map( g => g.letter)
      )
    );
  }

  ngOnInit(): void {
  }

}
