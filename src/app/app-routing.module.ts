import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicknameGuard } from './core/services/nickname.guard';


const routes: Routes = [
  {
    path: 'play',
    loadChildren: () => import('./play/play.module').then(m => m.PlayModule),
    canActivate: [NicknameGuard],
    canActivateChild: [NicknameGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
