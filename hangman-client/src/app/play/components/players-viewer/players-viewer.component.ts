import { Component, OnDestroy, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PlayersService } from '../../../core/services/players.service';

@Component({
  selector: 'hmo-players-viewer',
  templateUrl: './players-viewer.component.html',
  styleUrls: ['./players-viewer.component.scss']
})
export class PlayersViewerComponent implements OnInit, OnDestroy {
  me: string;
  currentTurn: string;
  players: string[];

  private sub: Subscription = new Subscription();

  constructor(
    private turnService: TurnService,
    private playersService: PlayersService
  ) {
  }

  ngOnInit(): void {
    this.me = this.turnService.currentUser;
    this.sub.add(
      this.turnService.getCurrentTurn$().pipe(
        tap(user => this.currentTurn = user)
      ).subscribe()
    );

    this.sub.add(
      this.playersService.getPlayers$().pipe(
        tap( players => this.players = players)
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
