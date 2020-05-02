import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable()
export class LeaveRoomGuard implements CanActivateChild, CanDeactivate<void> {

  constructor(
    private socketService: SocketService
  ) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.socketService.sendMessage('leave-room', undefined);
    return true;
  }

  canDeactivate(
    component: void,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    this.socketService.sendMessage('leave-room', undefined);
    return true;
  }
}
