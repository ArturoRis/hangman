import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { LeaveRoomGuard } from './services/leave-room.guard';


const routes: Routes = [
  {
    path: '', children: [
      {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
      },
      {
        path: 'welcome', component: WelcomeComponent
      },
      {
        path: 'manage-room', component: ManageRoomComponent
      }
    ],
    canActivateChild: [LeaveRoomGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
