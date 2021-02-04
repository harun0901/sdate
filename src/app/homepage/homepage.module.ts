import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { LogoComponent } from './logo/logo.component';
import { HfooterComponent } from './hfooter/hfooter.component';
import { IconModule } from '../ui-kit/icon/icon.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomepageComponent, LogoComponent, HfooterComponent, LoginComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    HomepageRoutingModule,
    IconModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomepageModule { }
