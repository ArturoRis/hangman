import { Component, OnInit } from '@angular/core';
import { GameQuery } from '../../state/game.query';
import { tap } from 'rxjs/operators';
import { BaseDirective } from '../../../core/base-objects/base.directive';

@Component({
  selector: 'hmo-play-screen',
  templateUrl: './play-screen.component.html',
  styleUrls: ['./play-screen.component.scss']
})
export class PlayScreenComponent extends BaseDirective implements OnInit {
  Status = Status;
  status?: Status;
  amIMaster?: boolean;

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
