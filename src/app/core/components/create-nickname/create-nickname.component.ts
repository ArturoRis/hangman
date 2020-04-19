import { Component, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'hmo-create-nickname',
  templateUrl: './create-nickname.component.html',
  styleUrls: ['./create-nickname.component.scss']
})
export class CreateNicknameComponent implements OnInit {

  nickname: string;

  constructor(
    private turnService: TurnService
  ) {
  }

  ngOnInit(): void {
    this.nickname = this.turnService.currentUser;
  }

  chooseNickname() {
    this.turnService.setNickname(this.nickname);
  }
}
