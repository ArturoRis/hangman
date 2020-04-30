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
import { RoomComponent } from './components/room/room.component';
import { RoomGuard } from './services/room.guard';
import { UiKitModule } from '../ui-kit/ui-kit.module';


@NgModule({
  declarations: [
    PlayScreenComponent,
    GameKeyboardComponent,
    HangmanComponent,
    GuessingWordComponent,
    ChooseWordComponent,
    PlayersViewerComponent,
    WaitingTurnDirective,
    RoomComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    FormsModule,
    UiKitModule
  ],
  providers: [
    GameStateService,
    RoomGuard
  ]
})
export class PlayModule { }
