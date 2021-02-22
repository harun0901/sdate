import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashTermsRoutingModule } from './dash-terms-routing.module';
import { DashTermsComponent } from './dash-terms.component';


@NgModule({
  declarations: [DashTermsComponent],
  imports: [
    CommonModule,
    DashTermsRoutingModule
  ]
})
export class DashTermsModule { }
