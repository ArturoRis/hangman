import { Component, Directive, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Fake directive
@Directive({})
export abstract class BaseDirective implements OnDestroy {
  @HostBinding('class.w-full')
  wFull = true;

  @HostBinding('class.block')
  block = true;

  private subs = new Subscription();

  protected addSubscription(sub: Subscription): void {
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
