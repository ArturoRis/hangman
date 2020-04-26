import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
  selector: 'hmo-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent implements OnInit {

  @Input() menu: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
