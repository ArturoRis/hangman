import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss']
})
export class PlayScreenComponent extends BaseComponent implements OnInit {
  Status = Status;
  status: Status;
  amIMaster: boolean;

  constructor(
    private gameStateService: GameStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameStateService.getWord$().pipe(
        tap(word => {
          if (!word || !word.length) {
            this.status = Status.CHOOSE_WORD;
          } else {
            this.status = Status.PLAY;
          }
        })
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getAmIMaster$().pipe(
        tap(amIMaster => this.amIMaster = amIMaster)
      ).subscribe()
    );
  }

}

enum Status {
  CHOOSE_WORD, PLAY
}
