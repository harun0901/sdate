import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashPaymentRoutingModule } from './dash-payment-routing.module';
import { DashPaymentComponent } from './dash-payment.component';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [DashPaymentComponent],
  imports: [
    CommonModule,
    DashPaymentRoutingModule,
    CommonUiKitModule,
    NgxChartsModule,
  ],
})
export class DashPaymentModule { }
