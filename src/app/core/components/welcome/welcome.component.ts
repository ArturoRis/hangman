import { Component, OnInit } from '@angular/core';
import { BaseDirective } from '../../base-objects/base.directive';
import { faArrowDown, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hmo-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends BaseDirective implements OnInit {

  faSmile = faSmile;
  faArrowDown = faArrowDown;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
