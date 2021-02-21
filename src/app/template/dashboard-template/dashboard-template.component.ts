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
    { icon: 'dashboard', label: 'Dashboard', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'calendar', label: 'UserSetting', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'projects', label: 'Projects', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'leads', label: 'Leads', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'customers', label: 'Customers', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'contractors', label: 'Contractors', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'ideaboard', label: 'Idea Board', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'hiring', label: 'Hiring', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'marketing', label: 'Marketing', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
    { icon: 'reviews', label: 'Reviews', route: toAbsolutePath([ROUTES.dashboard.root, ROUTES.dashboard.dashboard]) },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
