import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { AuthService } from '../../core/services/auth.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'sdate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ROUTES = ROUTES;

  constructor(
    private auth: AuthService,
    private router: Router,
    private scrollToService: ScrollToService,
    ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.auth.logout();
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
