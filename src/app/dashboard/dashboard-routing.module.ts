import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../core/data/routes';
import { DashboardTemplateComponent } from '../template/dashboard-template/dashboard-template.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashboardTemplateComponent,
    children: [
      {
        path: ROUTES.root,
        redirectTo: ROUTES.dashboard.dashboard
      },
      {
        path: ROUTES.dashboard.dashboard,
        component: DashboardComponent,
      },
      {
        path: ROUTES.dashboard.manageUser,
        loadChildren: () => import('./dash-user/dash-user.module').then(m => m.DashUserModule),
      },
      {
        path: ROUTES.dashboard.payment,
        loadChildren: () => import('./dash-payment/dash-payment.module').then(m => m.DashPaymentModule),
      },
      {
        path: ROUTES.dashboard.manageGift,
        loadChildren: () => import('./dash-gift/dash-gift.module').then(m => m.DashGiftModule),
      },
      {
        path: ROUTES.dashboard.manageContact,
        loadChildren: () => import('./dash-contact/dash-contact.module').then(m => m.DashContactModule),
      },
      {
        path: ROUTES.dashboard.manageGuideline,
        loadChildren: () => import('./dash-guideline/dash-guideline.module').then(m => m.DashGuidelineModule),
      },
      {
        path: ROUTES.dashboard.manageFaq,
        loadChildren: () => import('./dash-faq/dash-faq.module').then(m => m.DashFaqModule),
      },
      {
        path: ROUTES.dashboard.manageTerms,
        loadChildren: () => import('./dash-terms/dash-terms.module').then(m => m.DashTermsModule),
      },
      {
        path: ROUTES.dashboard.managePrivacy,
        loadChildren: () => import('./dash-privacy/dash-privacy.module').then(m => m.DashPrivacyModule),
      },
      {
        path: ROUTES.dashboard.manageLanguage,
        loadChildren: () => import('./dash-language/dash-language.module').then(m => m.DashLanguageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
