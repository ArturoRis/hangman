import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-objects/base-component';

@Component({
  selector: 'hmo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
