import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';


@NgModule({
  declarations: [PlayScreenComponent],
  imports: [
    CommonModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
