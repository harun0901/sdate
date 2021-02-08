import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../../core/data/routes';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    redirectTo: ROUTES.home.legal.imprint
  },
  {
    path: ROUTES.home.legal.imprint,
    component: ImprintComponent,
  },
  {
    path: ROUTES.home.legal.privacy,
    component: PrivacyComponent,
  },
  {
    path: ROUTES.home.legal.terms,
    component: TermsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
