import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './core/data/routes';

const routes: Routes = [
  {
    path: ROUTES.root,
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
  },
  {
    path: ROUTES.home.root,
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
