import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateNicknameComponent } from './components/create-nickname/create-nickname.component';
import { NicknameGuard } from './services/nickname.guard';
import { TurnService } from './services/turn.service';
import { FormsModule } from '@angular/forms';
import { SocketService } from './services/socket.service';


@NgModule({
  declarations: [
    PageComponent,
    MenuComponent,
    WelcomeComponent,
    CreateNicknameComponent
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
    NicknameGuard,
    TurnService,
    SocketService
  ]
})
export class CoreModule { }
