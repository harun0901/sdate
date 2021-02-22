import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashPrivacyComponent } from './dash-privacy.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashPrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashPrivacyRoutingModule { }
