import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BaseDirective } from '../../core/base-objects/base.directive';
import { tap } from 'rxjs/operators';
import { GameQuery } from '../state/game.query';
import { PlayerInfoQuery } from '../../core/state/player-info.query';

@Directive({
  selector: '[hmoWaitingTurn]'
})
export class WaitingTurnDirective extends BaseDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private gameQuery: GameQuery,
    private playerInfoQuery: PlayerInfoQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameQuery.getCurrentTurn$().pipe(
        tap(turn => {
          if (this.playerInfoQuery.getId() !== turn) {
            this.renderer.setAttribute(this.elRef.nativeElement, 'hidden', 'true');
          } else {
            this.renderer.removeAttribute(this.elRef.nativeElement, 'hidden');
          }
        })
      ).subscribe()
    );
  }

}
