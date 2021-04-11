import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseDirective } from '../../base-objects/base.directive';
import { MenuItem } from '../../../ui-kit/components/ui-menu/menu-item';

@Component({
  selector: 'hmo-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends BaseDirective implements OnInit {
  menu: MenuItem[];

  constructor() {
    super();
    this.menu = [
      {
        route: 'welcome',
        label: 'Benvenuto'
      },
      {
        route: 'manage-room',
        label: 'Gioca'
      },
      {
        route: 'feedback',
        label: 'Feedback'
      }
    ];
  }

  ngOnInit(): void {
  }

}
