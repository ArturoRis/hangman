import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

type Async<T> = Promise<T> | Observable<T>;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'button[asyncClick]',
  exportAs: 'asyncButton'
})
export class ButtonAsyncClickDirective<T> implements OnDestroy {
  private sub?: Subscription;

  @HostBinding('class.is-loading')
  isLoading = false;

  @HostBinding('attr.disabled')
  get attrDisabled(): true | null {
    return this.disabled ? true : null;
  }

  @Input()
  asyncClick?: ((event: Event) => Async<T>) | (() => Async<T>);

  @Input()
  disabled: boolean | null | undefined;

  @HostListener('click', ['$event'])
  click(event: Event): void {
    if (this.disabled || this.isLoading) {
      return;
    }
    this.unsubscribe();
    this.isLoading = true;
    this.sub = this.callAsyncClick(event).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  private callAsyncClick(event: Event): Observable<T> {
    if (!this.asyncClick) {
      throw new Error('What happened here? This should be impossible');
    }
    const ret = this.asyncClick(event);
    if (ret instanceof Promise) {
      return fromPromise(ret);
    } else {
      return ret;
    }
  }

  private unsubscribe(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
