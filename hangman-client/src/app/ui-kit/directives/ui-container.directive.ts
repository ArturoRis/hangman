import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmoUiContainer]'
})
export class UiContainerDirective {

  @HostBinding('class')
  classes = 'py-4 px-3 flex bg-bkg-secondary h-full';

}
