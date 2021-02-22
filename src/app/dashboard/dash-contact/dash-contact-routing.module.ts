import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashContactComponent } from './dash-contact.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashContactRoutingModule { }
