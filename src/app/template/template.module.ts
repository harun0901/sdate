import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardTemplateComponent } from './dashboard-template/dashboard-template.component';
import { CustomerTemplateComponent } from './customer-template/customer-template.component';
import { TemplateKitModule } from './template-kit/template-kit.module';
import { AvatarModule } from '../ui-kit/avatar/avatar.module';


@NgModule({
  declarations: [DashboardTemplateComponent, CustomerTemplateComponent],
  imports: [
    CommonModule,
    RouterModule,
    TemplateKitModule,
    AvatarModule,
  ],
  exports: [
    DashboardTemplateComponent,
    CustomerTemplateComponent,
  ]
})
export class TemplateModule { }
