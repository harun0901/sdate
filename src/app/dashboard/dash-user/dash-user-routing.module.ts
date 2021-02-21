import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashUserComponent } from './dash-user.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashUserRoutingModule { }
