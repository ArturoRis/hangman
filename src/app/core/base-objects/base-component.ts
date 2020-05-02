import { HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  @HostBinding('class.w-full')
  wFull = true;

  @HostBinding('class.block')
  block = true;

  private subs = new Subscription();

  protected addSubscription(sub: Subscription) {
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
