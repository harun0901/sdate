import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
