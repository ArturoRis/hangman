import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameQuery } from '../../state/game.query';
import { PlayerInfo } from '../../state/game.store';
import { PlayerInfoQuery } from '../../../core/state/player-info.query';
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
    private gameQuery: GameQuery,
    private playerInfoQuery: PlayerInfoQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.me = this.playerInfoQuery.getId();
    this.addSubscription(
      this.gameQuery.getCurrentTurn$().pipe(
        tap(user => this.currentTurn = user)
      ).subscribe()
    );

    this.addSubscription(
      this.gameQuery.getMaster$().pipe(
        tap(master => this.master = master)
      ).subscribe()
    );

    this.players = this.gameQuery.getPlayers$();
  }

}
