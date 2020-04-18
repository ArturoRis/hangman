import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GuessingWordComponent } from './components/guessing-word/guessing-word.component';
import { HangmanService } from './services/hangman.service';


@NgModule({
  declarations: [
    PlayScreenComponent,
    KeyboardComponent,
    HangmanComponent,
    GuessingWordComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule
  ],
  providers: [
    HangmanService
  ]
})
export class PlayModule { }
