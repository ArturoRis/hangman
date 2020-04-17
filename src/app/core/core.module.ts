import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    PageComponent,
    MenuComponent
  ],
  exports: [
    PageComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
