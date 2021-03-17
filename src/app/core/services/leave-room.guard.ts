import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { RoomService } from './room.service';

@Injectable()
export class LeaveRoomGuard implements CanDeactivate<void> {

  constructor(
    private roomService: RoomService
  ) {
  }

  canDeactivate(
    component: void,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    this.roomService.leaveRoom(currentRoute.params.ID).subscribe();
    return true;
  }
}
