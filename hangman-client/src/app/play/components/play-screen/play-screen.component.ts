import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hmo-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss']
})
export class PlayScreenComponent implements OnInit, OnDestroy {
  Status = Status;
  status: Status;

  private sub: Subscription = new Subscription();

  constructor(
    private gameStateService: GameStateService
  ) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.gameStateService.getState$().pipe(
        tap(state => {
          if (!state.currentWord) {
            this.status = Status.CHOOSE_WORD;
          } else {
            this.status = Status.PLAY;
          }
        })
      ).subscribe()
    );

    this.gameStateService.startGame();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

enum Status {
  CHOOSE_WORD, PLAY
}
