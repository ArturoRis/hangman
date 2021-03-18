import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../ui-kit/components/ui-menu/menu-item';
import { BaseDirective } from '../../base-objects/base.directive';

@Component({
  selector: 'hmo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseDirective implements OnInit {

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
      }
    ];
  }

  ngOnInit(): void {
  }

}
