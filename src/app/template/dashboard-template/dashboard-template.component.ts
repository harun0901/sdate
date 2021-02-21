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
      icon: 'projects',
      label: 'Payment',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.payment])
    },
    {
      icon: 'leads',
      label: 'GiftManage',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'customers',
      label: 'Contact',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'contractors',
      label: 'Guideline',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'ideaboard',
      label: 'Faq',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'hiring',
      label: 'Privacy & Terms',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'marketing',
      label: 'Faker',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
    {
      icon: 'reviews',
      label: 'Language',
      route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard])
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
