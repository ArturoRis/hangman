import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageComponent } from './components/page/page.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ManageRoomComponent } from './components/manage-room/manage-room.component';
import { LeaveRoomGuard } from './services/leave-room.guard';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { PlayerIdInterceptorProvider } from './services/player-id.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


@NgModule({
  declarations: [
    PageComponent,
    WelcomeComponent,
    ManageRoomComponent,
    FooterComponent,
    FeedbackComponent
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
    LeaveRoomGuard,
    PlayerIdInterceptorProvider
  ]
})
export class CoreModule {
}
