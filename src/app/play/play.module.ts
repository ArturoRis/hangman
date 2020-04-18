import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GuessingWordComponent } from './components/guessing-word/guessing-word.component';
import { HangmanService } from './components/hangman/hangman.service';
import { LettersService } from './services/letters.service';


@NgModule({
  declarations: [
    PlayScreenComponent,
    GameKeyboardComponent,
    HangmanComponent,
    GuessingWordComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule
  ],
  providers: [
    HangmanService,
    LettersService
  ]
})
export class PlayModule { }
