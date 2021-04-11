import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


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
      },
      {
        path: 'feedback', component: FeedbackComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
