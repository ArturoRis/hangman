import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../ui-kit/components/ui-menu/menu-item';

@Component({
  selector: 'hmo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: MenuItem[];
  constructor() { }

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
