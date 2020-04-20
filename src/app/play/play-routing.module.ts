import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { NicknameGuard } from './services/nickname.guard';
import { CreateNicknameComponent } from './components/create-nickname/create-nickname.component';


const routes: Routes = [
  {
    path: '', component: PlayScreenComponent,
    canActivate: [NicknameGuard],
    canActivateChild: [NicknameGuard]
  },
  {
    path: 'create-nickname', component: CreateNicknameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
