import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-objects/base-component';

@Component({
  selector: 'hmo-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends BaseComponent implements OnInit {

  @HostBinding('class.h-full')
  hFull = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
