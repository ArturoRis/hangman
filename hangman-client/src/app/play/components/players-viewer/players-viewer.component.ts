import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { GameStateService, PlayerInfo } from '../../services/game-state.service';
import { PlayerInfoService } from '../../../core/services/player-info.service';
import { BaseComponent } from '../../../core/base-objects/base-component';


@Component({
  selector: 'hmo-players-viewer',
  templateUrl: './players-viewer.component.html',
  styleUrls: ['./players-viewer.component.scss']
})
export class PlayersViewerComponent extends BaseComponent implements OnInit, OnDestroy {
  me: string;
  currentTurn: string;
  master: string;
  players: Observable<PlayerInfo[]>;

  constructor(
    private gameStateService: GameStateService,
    private playerInfoService: PlayerInfoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.me = this.playerInfoService.getId();
    this.addSubscription(
      this.gameStateService.getCurrentTurn$().pipe(
        tap(user => this.currentTurn = user)
      ).subscribe()
    );

    this.addSubscription(
      this.gameStateService.getMaster$().pipe(
        tap( master => this.master = master)
      ).subscribe()
    );

    this.players = this.gameStateService.getPlayers$();
  }

}
