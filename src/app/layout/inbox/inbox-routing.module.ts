import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '../../core/data/routes';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: InboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
