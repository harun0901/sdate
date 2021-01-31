import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { LogoComponent } from './logo/logo.component';
import { HfooterComponent } from './hfooter/hfooter.component';
import { IconModule } from '../ui-kit/icon/icon.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';


@NgModule({
  declarations: [HomepageComponent, LogoComponent, HfooterComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    IconModule,
    PipesModule,
  ]
})
export class HomepageModule { }
