import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';


@NgModule({
  declarations: [
    PlayScreenComponent,
    KeyboardComponent,
    HangmanComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
