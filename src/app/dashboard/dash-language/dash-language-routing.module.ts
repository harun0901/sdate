import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { DashLanguageComponent } from './dash-language.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashLanguageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashLanguageRoutingModule { }
