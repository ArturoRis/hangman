import { Component, OnDestroy, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hmo-waiting-turn',
  templateUrl: './waiting-turn.component.html',
  styleUrls: ['./waiting-turn.component.scss']
})
export class WaitingTurnComponent implements OnInit, OnDestroy {
  isMyTurn: boolean;
  user: string;

  private sub: Subscription = new Subscription();

  constructor(
    private turnService: TurnService
  ) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.turnService.getCurrentTurn$().pipe(
        tap(user => {
          this.isMyTurn = user === this.turnService.currentUser;
          this.user = user;
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
