import { Component, OnInit } from '@angular/core';
import { BaseDirective } from '../../../core/base-objects/base.directive';

@Component({
  selector: 'hmo-ui-logo',
  templateUrl: './ui-logo.component.html',
  styleUrls: ['./ui-logo.component.scss']
})
export class UiLogoComponent extends BaseDirective implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
