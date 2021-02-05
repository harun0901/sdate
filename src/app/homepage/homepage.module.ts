import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { LogoComponent } from './logo/logo.component';
import { HfooterComponent } from './hfooter/hfooter.component';
import { IconModule } from '../ui-kit/icon/icon.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { LoginComponent } from './login/login.component';
import { CommonUiKitModule } from '../ui-kit/common-ui-kit/common-ui-kit.module';


@NgModule({
  declarations: [HomepageComponent, LogoComponent, HfooterComponent, LoginComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HomepageRoutingModule,
    IconModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonUiKitModule,
  ],
})
export class HomepageModule { }
