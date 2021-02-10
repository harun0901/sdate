import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { LogoComponent } from './logo/logo.component';
import { HfooterComponent } from './hfooter/hfooter.component';
import { IconModule } from '../ui-kit/icon/icon.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { LoginComponent } from './login/login.component';
import { CommonUiKitModule } from '../ui-kit/common-ui-kit/common-ui-kit.module';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [HomepageComponent, LogoComponent, HfooterComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    HomepageRoutingModule,
    IconModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonUiKitModule,
  ],
})
export class HomepageModule { }
