import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashGuidelineComponent } from './dash-guideline.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashGuidelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashGuidelineRoutingModule { }
