import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmoUiTitle]'
})
export class UiTitleDirective {

  @HostBinding('class')
  classes = 'text-3xl py-2 block';

}
