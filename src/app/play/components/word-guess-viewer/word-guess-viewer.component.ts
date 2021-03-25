import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameQuery } from '../../state/game.query';

@Component({
  selector: 'hmo-word-guess-viewer',
  templateUrl: './word-guess-viewer.component.html',
  styleUrls: ['./word-guess-viewer.component.scss']
})
export class WordGuessViewerComponent implements OnInit {

  wordGuesses$: Observable<string[]>;

  constructor(
    private gameQuery: GameQuery
  ) {
    this.wordGuesses$ = this.gameQuery.getWordGuesses$();
  }

  ngOnInit(): void {
  }

}
