import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PlayerInfo, PlayersService } from '../../../core/services/players.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'hmo-players-viewer',
  templateUrl: './players-viewer.component.html',
  styleUrls: ['./players-viewer.component.scss']
})
export class PlayersViewerComponent implements OnInit, OnDestroy {
  me: string;
  currentTurn: string;
  players: Observable<PlayerInfo[]>;

  private sub: Subscription = new Subscription();

  constructor(
    private playersService: PlayersService,
    private gameStateService: GameStateService
  ) {
  }

  ngOnInit(): void {
    this.me = this.gameStateService.currentUser;
    this.sub.add(
      this.gameStateService.getCurrentTurn$().pipe(
        tap(user => this.currentTurn = user)
      ).subscribe()
    );

    this.players = this.playersService.getPlayers$();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
