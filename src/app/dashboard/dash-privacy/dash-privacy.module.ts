import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashPrivacyRoutingModule } from './dash-privacy-routing.module';
import { DashPrivacyComponent } from './dash-privacy.component';


@NgModule({
  declarations: [DashPrivacyComponent],
  imports: [
    CommonModule,
    DashPrivacyRoutingModule
  ]
})
export class DashPrivacyModule { }
