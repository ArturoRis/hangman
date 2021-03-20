import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmoUiTitle]'
})
export class UiTitleDirective {
  @HostBinding('class')
  classes = 'is-size-4-mobile is-size-3-tablet py-2 has-text-centered-mobile has-text-left-desktop';
}
