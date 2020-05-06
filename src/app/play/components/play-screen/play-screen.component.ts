import { Component, OnInit } from '@angular/core';
import { GameQuery } from '../../state/game.query';
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
    private gameQuery: GameQuery,
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameQuery.getWord$().pipe(
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
      this.gameQuery.getAmIMaster$().pipe(
        tap(amIMaster => this.amIMaster = amIMaster)
      ).subscribe()
    );
  }

}

enum Status {
  CHOOSE_WORD, PLAY
}
