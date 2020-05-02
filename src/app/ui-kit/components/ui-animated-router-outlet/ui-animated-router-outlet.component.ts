import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('fadeInAnimation', [

    // route 'enter' transition
    transition('* <=> *', [

      // css styles at start of transition
      style({opacity: 0}),

      // animation and styles at end of transition
      animate('.3s', style({opacity: 1}))
    ]),
  ]);


@Component({
  selector: 'hmo-ui-animated-router-outlet',
  templateUrl: './ui-animated-router-outlet.component.html',
  styleUrls: ['./ui-animated-router-outlet.component.scss'],
  animations: [fadeInAnimation]
})
export class UiAnimatedRouterOutletComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}

