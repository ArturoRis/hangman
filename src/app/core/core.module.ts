import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { SocketService } from './services/socket.service';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { LeaveRoomGuard } from './services/leave-room.guard';
import { UiKitModule } from '../ui-kit/ui-kit.module';


@NgModule({
  declarations: [
    PageComponent,
    MenuComponent,
    WelcomeComponent,
    ManageRoomComponent
  ],
  exports: [
    PageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreRoutingModule,
    UiKitModule
  ],
  providers: [
    SocketService,
    LeaveRoomGuard
  ]
})
export class CoreModule {
}
