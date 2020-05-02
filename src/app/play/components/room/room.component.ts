import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { PlayerInfoService } from '../../../core/services/player-info.service';
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
    private playerInfoService: PlayerInfoService,
    private gameStateService: GameStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.amIMaster = this.gameStateService.getMaster$().pipe(
      map(master => this.playerInfoService.getId() === master)
    );
  }

  startGame() {
    this.gameStateService.initGame();
  }
}
