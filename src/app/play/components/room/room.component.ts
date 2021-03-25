import { Component, OnInit } from '@angular/core';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { GameService } from '../../state/game.service';
import { GameQuery } from '../../state/game.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseDirective implements OnInit {

  amIMaster$: Observable<boolean>;

  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery
  ) {
    super();
    this.amIMaster$ = this.gameQuery.getAmIMaster$();
  }

  ngOnInit(): void {

  }

  startGame(): Observable<void> {
    return this.gameService.initGame();
  }
}
