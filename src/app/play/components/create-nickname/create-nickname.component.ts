import { Component, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-create-nickname',
  templateUrl: './create-nickname.component.html',
  styleUrls: ['./create-nickname.component.scss']
})
export class CreateNicknameComponent extends BaseComponent implements OnInit {

  nickname: string;
  loading: boolean;
  resp: string;

  constructor(
    private turnService: TurnService
  ) {
    super();
  }

  ngOnInit(): void {
    this.nickname = this.turnService.currentUser;
  }

  chooseNickname() {
    this.loading = true;
    this.resp = undefined;
    this.addSubscription(
      this.turnService.setNickname(this.nickname).pipe(
        tap((resp: any) => {
          this.loading = false;
          this.resp = resp.ok ? 'OK' : 'ERRORE';
        })

      ).subscribe()
    );
  }
}
