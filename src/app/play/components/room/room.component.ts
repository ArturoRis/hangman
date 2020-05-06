import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  amIMaster: Observable<boolean>;

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
    this.gameService.initGame();
  }
}
