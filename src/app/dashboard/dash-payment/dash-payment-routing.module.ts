import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashPaymentComponent } from './dash-payment.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashPaymentRoutingModule { }
