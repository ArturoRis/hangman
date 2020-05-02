import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { GameStateService } from '../../services/game-state.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-try-to-guess',
  templateUrl: './try-to-guess.component.html',
  styleUrls: ['./try-to-guess.component.scss']
})
export class TryToGuessComponent extends BaseComponent implements OnInit {

  turnsToWait = 0;
  wordGuess: string;
  wordGuesses$: Observable<string[]>;
  amINotMaster$: Observable<boolean>;

  constructor(
    private gameStateService: GameStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameStateService.getCurrentTurn$().pipe(
        tap(() => {
          if (this.turnsToWait > 0) {
            this.turnsToWait -= 1;
          }
        })
      ).subscribe()
    );

    this.wordGuesses$ = this.gameStateService.getWordGuesses$();

    this.amINotMaster$ = this.gameStateService.getAmIMaster$().pipe(
      map( amIMaster => !amIMaster)
    );
  }

  sendTry() {
    this.gameStateService.sendWordGuess(this.wordGuess);
    this.turnsToWait = 3;
    this.wordGuess = '';
  }
}
