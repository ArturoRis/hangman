import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseDirective } from '../../base-objects/base.directive';

@Component({
  selector: 'hmo-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends BaseDirective implements OnInit {

  @HostBinding('class.h-full')
  hFull = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
