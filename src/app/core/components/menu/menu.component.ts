import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../ui-kit/components/ui-menu/menu-item';
import { BaseComponent } from '../../base-objects/base-component';

@Component({
  selector: 'hmo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent implements OnInit {

  menu: MenuItem[];

  constructor() {
    super();
  }

  ngOnInit(): void {
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

}
