import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../core/data/routes';
import { DashboardTemplateComponent } from '../template/dashboard-template/dashboard-template.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashboardTemplateComponent,
    children: [
      {
        path: ROUTES.root,
        redirectTo: ROUTES.dashboard.dashboard
      },
      {
        path: ROUTES.dashboard.dashboard,
        component: DashboardComponent,
      },
      {
        path: ROUTES.dashboard.manageUser,
        loadChildren: () => import('./dash-user/dash-user.module').then(m => m.DashUserModule),
      },
      {
        path: ROUTES.dashboard.payment,
        loadChildren: () => import('./dash-payment/dash-payment.module').then(m => m.DashPaymentModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
