import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TurnService } from '../services/turn.service';
import { BaseComponent } from '../../core/base-objects/base-component';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[hmoWaitingTurn]'
})
export class WaitingTurnDirective extends BaseComponent implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private turnService: TurnService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.turnService.getCurrentTurn$().pipe(
        tap( turn => {
          if (this.turnService.currentUser !== turn) {
            this.renderer.setAttribute(this.elRef.nativeElement, 'hidden', 'true');
          } else {
            this.renderer.removeAttribute(this.elRef.nativeElement, 'hidden');
          }
        })
      ).subscribe()
    );
  }

}
