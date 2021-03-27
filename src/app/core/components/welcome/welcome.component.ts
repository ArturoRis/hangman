import { Component, OnInit } from '@angular/core';
import { BaseDirective } from '../../base-objects/base.directive';

@Component({
  selector: 'hmo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends BaseDirective implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
