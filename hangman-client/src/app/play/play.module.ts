import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { GuessingWordComponent } from './components/guessing-word/guessing-word.component';
import { ChooseWordComponent } from './components/choose-word/choose-word.component';
import { FormsModule } from '@angular/forms';
import { PlayersViewerComponent } from './components/players-viewer/players-viewer.component';
import { GameStateService } from './services/game-state.service';
import { WaitingTurnDirective } from './directives/waiting-turn.directive';


@NgModule({
  declarations: [
    PlayScreenComponent,
    GameKeyboardComponent,
    HangmanComponent,
    GuessingWordComponent,
    ChooseWordComponent,
    PlayersViewerComponent,
    WaitingTurnDirective
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule
  ],
  providers: [
    GameStateService
  ]
})
export class PlayModule { }
