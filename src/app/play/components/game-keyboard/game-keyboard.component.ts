import { Component, OnInit } from '@angular/core';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { filter, first, map, shareReplay, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PlayerInfoQuery } from '../../../core/state/player-info.query';
import { DataLoaderObservable } from '../../../utils/data-loader.observable';

@Component({
  selector: 'hmo-game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss']
})
export class GameKeyboardComponent extends BaseDirective implements OnInit {

  BUTTONS: GKButton[] = [];
  showRestart$: Observable<boolean>;
  showGameKeyboard$: Observable<boolean>;
  showWin?: string | boolean;
  itsMe?: boolean;
  lettersNotGuessed$: Observable<string[]>;
  wordGuesses$: Observable<string[]>;
  restartButton?: DataLoaderObservable<void>;

  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery,
    private playerInfoQuery: PlayerInfoQuery
  ) {
    super();
    for (let c = 65; c < 91; c++) {
      this.BUTTONS.push({
        key: String.fromCharCode(c),
        isDisabled: false
      });
    }

    this.lettersNotGuessed$ = this.gameQuery.getGuesses$().pipe(
      map( guesses => guesses
        .filter( g => !g.ids || !g.ids.length)
        .map( g => g.letter)
      ),
      shareReplay(1)
    );

    this.wordGuesses$ = this.gameQuery.getWordGuesses$();

    this.showGameKeyboard$ = this.gameQuery.getStatus$().pipe(
      map((status) => !status)
    );

    this.showRestart$ = combineLatest([
      this.showGameKeyboard$,
      this.gameQuery.getMaster$()
    ]).pipe(
      map(([showGameKeyboard, master]) => !showGameKeyboard && this.playerInfoQuery.getId() === master)
    );
  }

  ngOnInit(): void {
    this.enableAllButtons();

    this.addSubscription(
      this.gameQuery.getNewGuess$().pipe(
        filter(guess => !!guess),
        tap((guess) => {
          if (guess) {
            this.disableButton(guess.letter);
          }
        })
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getGuesses$().pipe(
        tap(guesses => guesses.forEach(key => this.disableButton(key.letter)))
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getStatus$().pipe(
        tap(status => {
          this.itsMe = undefined;
          this.showWin = undefined;
          if (status && status !== 'lose') {
            this.showWin = this.gameQuery.players.find(p => p.id === status)?.name;
            this.itsMe = status === this.playerInfoQuery.getId();
          } else if (status === 'lose') {
            this.showWin = false;
          }
        })
      ).subscribe()
    );

  }

  buttonClicked(button: GKButton): void {
    button.clickHandler = new DataLoaderObservable(this.gameService.sendLetter(button.key));
    button.clickHandler.subscribe( () => {
      this.disableButton(button.key);
    });
  }

  disableButton(key: string): void {
    const button = this.BUTTONS.find(b => b.key === key);
    if (button) {
      button.isDisabled = true;
    }
  }

  restartGame(): void {
    if (this.restartButton && this.restartButton.loading) {
      return;
    }
    this.restartButton = new DataLoaderObservable<void>(this.gameService.restartGame());
    this.restartButton.subscribe();
  }

  private enableAllButtons(): void {
    this.BUTTONS.forEach(b => b.isDisabled = false);
  }
}

interface GKButton {
  key: string;
  isDisabled: boolean;
  clickHandler?: DataLoaderObservable<any>;
}
