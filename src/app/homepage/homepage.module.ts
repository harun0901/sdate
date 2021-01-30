import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { LogoComponent } from './logo/logo.component';
import { HfooterComponent } from './hfooter/hfooter.component';


@NgModule({
  declarations: [HomepageComponent, LogoComponent, HfooterComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
