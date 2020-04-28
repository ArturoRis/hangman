import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hmoUiContainer]'
})
export class UiContainerDirective {

  @HostBinding('class')
  classes = 'py-4 px-2 flex bg-bkg-secondary h-full';

}
