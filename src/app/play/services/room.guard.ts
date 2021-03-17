import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameService } from '../state/game.service';
import { SocketService } from './socket.service';
import { PlayerInfoQuery } from '../../core/state/player-info.query';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RoomService } from '../../core/services/room.service';

@Injectable()
export class RoomGuard implements CanActivate {
  constructor(
    private gameStateService: GameService,
    private roomService: RoomService,
    private socketService: SocketService,
    private playerInfoQuery: PlayerInfoQuery,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const roomId = next.params.ID;
    return this.roomService.joinRoom(roomId, this.playerInfoQuery.getName()).pipe(
      switchMap( () => this.gameStateService.getState(roomId)),
      map( () => true),
      catchError( () => of(this.router.createUrlTree(['manage-room'])))
    );
  }

}
