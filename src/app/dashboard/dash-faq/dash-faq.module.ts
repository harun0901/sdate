import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashFaqRoutingModule } from './dash-faq-routing.module';
import { DashFaqComponent } from './dash-faq.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [DashFaqComponent],
  imports: [
    CommonModule,
    DashFaqRoutingModule,
    MatExpansionModule,
  ],
})
export class DashFaqModule { }
