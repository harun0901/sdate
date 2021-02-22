import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { DashContactRoutingModule } from './dash-contact-routing.module';
import { DashContactComponent } from './dash-contact.component';
import { IconModule } from '../../ui-kit/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashContactComponent],
  imports: [
    CommonModule,
    MatListModule,
    DashContactRoutingModule,
    IconModule,
    ReactiveFormsModule,
  ],
})
export class DashContactModule { }
