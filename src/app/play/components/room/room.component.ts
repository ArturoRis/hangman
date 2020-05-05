import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { GameStateService } from '../../services/game-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  amIMaster: Observable<boolean>;

  constructor(
    private gameStateService: GameStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.amIMaster = this.gameStateService.getAmIMaster$();
  }

  startGame() {
    this.gameStateService.initGame();
  }
}
