import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameState } from '../state/game.store';
import { GameService } from '../state/game.service';
import { SocketService } from '../../core/services/socket.service';
import { PlayerInfoQuery } from '../../core/state/player-info.query';

@Injectable()
export class RoomGuard implements CanActivate, CanActivateChild {
  constructor(
    private gameStateService: GameService,
    private socketService: SocketService,
    private playerInfoQuery: PlayerInfoQuery,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(sub => {
      this.socketService.sendMessage<GameState>('join-room', {
        roomId: next.params.ID,
        name: this.playerInfoQuery.getName()
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
