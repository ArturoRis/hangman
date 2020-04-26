import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { RoomComponent } from './components/room/room.component';
import { RoomGuard } from './services/room.guard';
import { LeaveRoomGuard } from '../core/services/leave-room.guard';


const routes: Routes = [
  {
    path: ':ID', children: [
      {
        path: '', component: RoomComponent
      },
      {
        path: 'play', component: PlayScreenComponent
      }
    ],
    canActivateChild: [RoomGuard],
    canDeactivate: [LeaveRoomGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
