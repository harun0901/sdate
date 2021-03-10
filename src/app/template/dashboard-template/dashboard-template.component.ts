import { Component, OnInit } from '@angular/core';

import { ROUTES, toAbsolutePath } from '../../core/data/routes';

@Component({
  selector: 'sdate-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.scss']
})
export class DashboardTemplateComponent implements OnInit {
  ROUTES = ROUTES;
  menus = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'calendar',
      label: 'UserManage',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageUser])
    },
    {
      icon: 'calendar',
      label: 'CategoryManage',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.categoryManage])
    },
    {
      icon: 'projects',
      label: 'Payment',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.payment])
    },
    {
      icon: 'leads',
      label: 'GiftManage',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageGift])
    },
    {
      icon: 'customers',
      label: 'Contact',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageContact])
    },
    {
      icon: 'contractors',
      label: 'Guideline',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageGuideline])
    },
    {
      icon: 'ideaboard',
      label: 'Faq',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageFaq])
    },
    {
      icon: 'hiring',
      label: 'Terms & Conditions',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageTerms])
    },
    {
      icon: 'marketing',
      label: 'Privacy and Imprint',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.managePrivacy])
    },
    {
      icon: 'reviews',
      label: 'Language',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.manageLanguage])
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
