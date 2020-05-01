import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent extends BaseComponent implements OnInit {

  @Input() menu: MenuItem[];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
