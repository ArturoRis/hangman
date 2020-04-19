import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { TurnService } from './turn.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NicknameGuard implements CanActivate, CanActivateChild {
  constructor(
    private turnService: TurnService,
    private router: Router
  ) {
  }

  canActivate(): boolean | UrlTree {
    return this.turnService.currentUser ? true : this.router.createUrlTree(['create-nickname']);
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }

}
