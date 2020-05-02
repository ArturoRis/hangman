import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { GameStateService } from '../../services/game-state.service';
import { BaseComponent } from '../../../core/base-objects/base-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'hmo-guessing-word',
  templateUrl: './guessing-word.component.html',
  styleUrls: ['./guessing-word.component.scss']
})
export class GuessingWordComponent extends BaseComponent implements OnInit {
  lettersInfo: Observable<LetterInfo[]>;

  constructor(
    private gameStateService: GameStateService
  ) {
    super();
  }

  ngOnInit(): void {

    this.lettersInfo = this.gameStateService.getWord$().pipe(
      filter(word => !!word && !!word.length)
    );
  }
}

interface LetterInfo {
  letter?: string;
  isGuessed: boolean;
}
