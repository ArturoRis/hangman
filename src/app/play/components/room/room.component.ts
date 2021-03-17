import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { Observable } from 'rxjs';
import { DataLoaderObservable } from '../../../utils/data-loader.observable';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  amIMaster: Observable<boolean>;
  startButton: DataLoaderObservable<void>;

  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.amIMaster = this.gameQuery.getAmIMaster$();
  }

  startGame() {
    if (this.startButton && this.startButton.loading) {
      return;
    }
    this.startButton = new DataLoaderObservable<void>(this.gameService.initGame());
    this.startButton.subscribe();
  }
}
