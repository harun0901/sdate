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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
