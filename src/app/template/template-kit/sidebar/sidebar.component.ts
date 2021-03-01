import { Component, Input, OnInit } from '@angular/core';

import { ROUTES } from '../../../core/data/routes';
import { AuthService } from '../../../core/services/auth.service';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'sdate-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menus = [];

  ROUTES = ROUTES;
  isCollapsed = true;
  user$ = this.authService.user$;

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.socketService.disconnect(this.authService.user.id);
    this.authService.logout();
  }
}
