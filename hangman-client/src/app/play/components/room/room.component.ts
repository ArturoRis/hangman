import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { PlayerInfoService } from '../../../core/services/player-info.service';
import { GameStateService, PlayerInfo } from '../../services/game-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends BaseComponent implements OnInit {

  players: Observable<PlayerInfo[]>;
  roomId: Observable<string>;
  amIMaster: Observable<boolean>;

  constructor(
    private socketService: SocketService,
    private playerInfoService: PlayerInfoService,
    private gameStateService: GameStateService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {

    this.roomId = this.gameStateService.getId$();

    this.amIMaster = this.gameStateService.getMaster$().pipe(
      map(master => this.playerInfoService.getId() === master)
    );

    this.players = this.gameStateService.getPlayers$();
  }

  startGame() {
    this.gameStateService.initGame();
  }
}
