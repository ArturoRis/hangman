import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { BaseDirective } from '../../../core/base-objects/base.directive';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hmo-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent extends BaseDirective implements OnInit {
  @Input() menu?: MenuItem[];

  isActive = false;

  constructor(
    private router: Router
  ) {
    super();

    this.addSubscription(
      this.router.events.pipe(
        tap( () => this.isActive = false)
      ).subscribe()
    );
  }

  ngOnInit(): void {
  }

}
