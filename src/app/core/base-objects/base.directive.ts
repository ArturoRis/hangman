import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Fake directive
@Directive({})
export abstract class BaseDirective implements OnDestroy {
  private subs = new Subscription();

  protected addSubscription(sub: Subscription): void {
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
