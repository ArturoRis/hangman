import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from '../../core/base-objects/base-component';
import { tap } from 'rxjs/operators';
import { GameStateService } from '../services/game-state.service';
import { PlayerInfoService } from '../../core/services/player-info.service';

@Directive({
  selector: '[hmoWaitingTurn]'
})
export class WaitingTurnDirective extends BaseComponent implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private gameStateService: GameStateService,
    private playerInfoService: PlayerInfoService
  ) {
    super();
    this.wFull = false;
    this.block = false;
  }

  ngOnInit(): void {
    this.addSubscription(
      this.gameStateService.getCurrentTurn$().pipe(
        tap(turn => {
          if (this.playerInfoService.getId() !== turn) {
            this.renderer.setAttribute(this.elRef.nativeElement, 'hidden', 'true');
          } else {
            this.renderer.removeAttribute(this.elRef.nativeElement, 'hidden');
          }
        })
      ).subscribe()
    );
  }

}
