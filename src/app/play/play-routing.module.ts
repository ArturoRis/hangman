import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';


const routes: Routes = [
  {
    path: '', component: PlayScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
