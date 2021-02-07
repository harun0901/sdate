import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../../core/data/routes';
import { FaqComponent } from './faq/faq.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    redirectTo: ROUTES.home.support.faq
  },
  {
    path: ROUTES.home.support.faq,
    component: FaqComponent,
  },
  {
    path: ROUTES.home.support.guideline,
    component: GuidelineComponent,
  },
  {
    path: ROUTES.home.support.contact,
    component: ContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
