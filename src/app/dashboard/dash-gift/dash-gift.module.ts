import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { DashGiftRoutingModule } from './dash-gift-routing.module';
import { DashGiftComponent } from './dash-gift.component';
import { IconModule } from '../../ui-kit/icon/icon.module';


@NgModule({
  declarations: [DashGiftComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    DashGiftRoutingModule,
    IconModule,
  ],
})
export class DashGiftModule { }
