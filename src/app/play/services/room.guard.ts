import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameState, GameStateService } from './game-state.service';
import { SocketService } from '../../core/services/socket.service';
import { PlayerInfoService } from '../../core/services/player-info.service';

@Injectable()
export class RoomGuard implements CanActivate, CanActivateChild {
  constructor(
    private gameStateService: GameStateService,
    private socketService: SocketService,
    private playerInfoService: PlayerInfoService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(sub => {
      this.socketService.sendMessage<GameState>('join-room', {
        roomId: next.params.ID,
        name: this.playerInfoService.getName()
      }, ({data: gameState, ok}) => {
        console.log('join-room', ok, gameState);

        if (ok) {
          this.gameStateService.startGame(gameState);
        }

        sub.next(ok || this.router.createUrlTree(['manage-room']));
        sub.complete();
      });
    });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(next.parent, state);
  }


}
