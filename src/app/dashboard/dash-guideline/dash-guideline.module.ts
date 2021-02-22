import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashGuidelineRoutingModule } from './dash-guideline-routing.module';
import { DashGuidelineComponent } from './dash-guideline.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [DashGuidelineComponent],
  imports: [
    CommonModule,
    DashGuidelineRoutingModule,
    MatTabsModule,
  ],
})
export class DashGuidelineModule { }
