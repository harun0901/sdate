import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashPriceManagementRoutingModule } from './dash-price-management-routing.module';
import { DashPriceManagementComponent } from './dash-price-management.component';
import { PackagePriceComponent } from './package-price/package-price.component';
import { GiftPriceComponent } from './gift-price/gift-price.component';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashPriceManagementComponent, PackagePriceComponent, GiftPriceComponent],
  imports: [
    CommonModule,
    DashPriceManagementRoutingModule,
    CommonUiKitModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashPriceManagementModule { }
