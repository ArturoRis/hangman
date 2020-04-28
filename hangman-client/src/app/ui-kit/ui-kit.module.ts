import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMenuComponent } from './components/ui-menu/ui-menu.component';
import { UiLogoComponent } from './components/ui-logo/ui-logo.component';
import { RouterModule } from '@angular/router';
import { UiContainerDirective } from './directives/ui-container.directive';
import { UiTitleDirective } from './directives/ui-title.directive';


@NgModule({
  declarations: [
    UiMenuComponent,
    UiLogoComponent,
    UiContainerDirective,
    UiTitleDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UiMenuComponent,
    UiLogoComponent,
    UiContainerDirective,
    UiTitleDirective
  ]
})
export class UiKitModule {
}
