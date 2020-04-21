import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateNicknameComponent } from '../play/components/create-nickname/create-nickname.component';
import { FormsModule } from '@angular/forms';
import { SocketService } from './services/socket.service';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { RoomComponent } from './components/room/room.component';


@NgModule({
  declarations: [
    PageComponent,
    MenuComponent,
    WelcomeComponent,
    CreateNicknameComponent,
    ManageRoomComponent,
    RoomComponent
  ],
  exports: [
    PageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreRoutingModule,
  ],
  providers: [
    SocketService
  ]
})
export class CoreModule { }
