import { Directive, HostBinding, Input } from '@angular/core';
// tslint:disable:directive-selector

@Directive({
  selector: 'button'
})
export class ButtonDirective {
  @Input() color: 'primary' | 'secondary' | 'link' = 'primary';
  @HostBinding('class') class = `button is-${this.color}`;
}

@Directive({
  selector: 'input'
})
export class InputDirective {
  @HostBinding('class') class = 'input';
}

export const UiDirectives = [
  ButtonDirective,
  InputDirective
];
