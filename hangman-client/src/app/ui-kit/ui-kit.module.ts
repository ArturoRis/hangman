import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMenuComponent } from './components/ui-menu/ui-menu.component';
import { UiLogoComponent } from './components/ui-logo/ui-logo.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UiMenuComponent, UiLogoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [UiMenuComponent, UiLogoComponent]
})
export class UiKitModule { }
