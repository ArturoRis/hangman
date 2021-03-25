import { Component, OnInit } from '@angular/core';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'hmo-try-to-guess',
  templateUrl: './try-to-guess.component.html',
  styleUrls: ['./try-to-guess.component.scss']
})
export class TryToGuessComponent extends BaseDirective implements OnInit {

  turnsToWait = 0;
  wordGuess?: string;
  amINotMaster$: Observable<boolean>;

  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery
  ) {
    super();
    this.amINotMaster$ = this.gameQuery.getAmIMaster$().pipe(
      map(amIMaster => !amIMaster)
    );
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameQuery.getCurrentTurn$().pipe(
        tap(() => {
          if (this.turnsToWait > 0) {
            this.turnsToWait -= 1;
          }
        })
      ).subscribe()
    );
  }

  sendTry(): Observable<void> {
    if (!this.wordGuess) {
      return of();
    }
    return this.gameService.sendWordGuess(this.wordGuess).pipe(
      tap(
        () => {
          this.wordGuess = '';
          this.turnsToWait = 3;
        }
      )
    );
  }
}
