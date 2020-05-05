import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '../../core/base-objects/base-component';
import { tap } from 'rxjs/operators';
import { GameStateService } from '../services/game-state.service';
import { PlayerInfoQuery } from '../../core/state/player-info.query';

@Directive({
  selector: '[hmoWaitingTurn]'
})
export class WaitingTurnDirective extends BaseComponent implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private gameStateService: GameStateService,
    private playerInfoQuery: PlayerInfoQuery
  ) {
    super();
    this.wFull = false;
    this.block = false;
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameStateService.getCurrentTurn$().pipe(
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
