import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GuessingWordComponent } from './components/guessing-word/guessing-word.component';
import { HangmanService } from './components/hangman/hangman.service';
import { LettersService } from './services/letters.service';
import { ChooseWordComponent } from './components/choose-word/choose-word.component';
import { FormsModule } from '@angular/forms';
import { WaitingTurnComponent } from './components/waiting-turn/waiting-turn.component';
import { GameStateService } from './services/game-state.service';
import { TurnService } from './services/turn.service';


@NgModule({
  declarations: [
    PlayScreenComponent,
    GameKeyboardComponent,
    HangmanComponent,
    GuessingWordComponent,
    ChooseWordComponent,
    WaitingTurnComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule
  ],
  providers: [
    HangmanService,
    LettersService,
    GameStateService,
    TurnService
  ]
})
export class PlayModule { }
