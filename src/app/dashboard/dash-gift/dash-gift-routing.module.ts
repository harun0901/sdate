import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashGiftComponent } from './dash-gift.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashGiftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashGiftRoutingModule { }
