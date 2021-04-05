import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashPriceManagementComponent } from './dash-price-management.component';

const routes: Routes = [
  {
    path: '',
    component: DashPriceManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashPriceManagementRoutingModule { }
