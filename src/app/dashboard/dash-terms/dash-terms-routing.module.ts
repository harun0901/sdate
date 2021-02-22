import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashTermsComponent } from './dash-terms.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashTermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashTermsRoutingModule { }
