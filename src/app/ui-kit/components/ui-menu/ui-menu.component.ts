import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './menu-item';
import { BaseDirective } from '../../../core/base-objects/base.directive';

@Component({
  selector: 'hmo-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent extends BaseDirective implements OnInit {

  @Input() menu?: MenuItem[];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
