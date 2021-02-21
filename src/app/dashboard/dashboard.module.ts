import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TemplateModule } from '../template/template.module';
import { IconModule } from '../ui-kit/icon/icon.module';
import { CommonUiKitModule } from '../ui-kit/common-ui-kit/common-ui-kit.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    DashboardRoutingModule,
    TemplateModule,
    IconModule,
    CommonUiKitModule,
  ],
  exports: []
})
export class DashboardModule { }
