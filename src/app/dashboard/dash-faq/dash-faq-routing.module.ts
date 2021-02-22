import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashFaqComponent } from './dash-faq.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashFaqRoutingModule { }
