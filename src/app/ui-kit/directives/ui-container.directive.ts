import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmoUiContainer]'
})
export class UiContainerDirective {

  @HostBinding('class')
  classes = 'container';

}
