import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../core/data/routes';
import { DashboardTemplateComponent } from '../template/dashboard-template/dashboard-template.component';
import { DashboardComponent } from './dashboard.component';
import { UserResolver } from '../core/resolvers/user.resolver';
import { RoleGuard } from '../core/guards/role.guard';
import { UserRole } from '../core/models/auth';

const routes: Routes = [
  {
    path: ROUTES.root,
    component: DashboardTemplateComponent,
    resolve: { user: UserResolver },
    canActivate: [RoleGuard],
    data: {
      roles: [UserRole.Admin, UserRole.SuperAdmin]
    },
    children: [
      {
        path: ROUTES.root,
        redirectTo: ROUTES.dashboard.dashboard
      },
      {
        path: ROUTES.dashboard.dashboard,
        component: DashboardComponent,
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageUser,
        loadChildren: () => import('./dash-user/dash-user.module').then(m => m.DashUserModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.payment,
        loadChildren: () => import('./dash-payment/dash-payment.module').then(m => m.DashPaymentModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageGift,
        loadChildren: () => import('./dash-gift/dash-gift.module').then(m => m.DashGiftModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageContact,
        loadChildren: () => import('./dash-contact/dash-contact.module').then(m => m.DashContactModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageGuideline,
        loadChildren: () => import('./dash-guideline/dash-guideline.module').then(m => m.DashGuidelineModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageFaq,
        loadChildren: () => import('./dash-faq/dash-faq.module').then(m => m.DashFaqModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageTerms,
        loadChildren: () => import('./dash-terms/dash-terms.module').then(m => m.DashTermsModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.managePrivacy,
        loadChildren: () => import('./dash-privacy/dash-privacy.module').then(m => m.DashPrivacyModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.manageLanguage,
        loadChildren: () => import('./dash-language/dash-language.module').then(m => m.DashLanguageModule),
        resolve: {user: UserResolver},
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      },
      {
        path: ROUTES.dashboard.priceManagement,
        loadChildren: () => import('./dash-price-management/dash-price-management.module').then(m => m.DashPriceManagementModule),
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.SuperAdmin]
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
