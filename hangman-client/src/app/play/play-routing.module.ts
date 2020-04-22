import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';


const routes: Routes = [
  {
    path: ':ID', component: PlayScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
