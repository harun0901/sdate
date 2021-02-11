import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { User } from '../../core/models/user';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'sdate-personcard',
  templateUrl: './personcard.component.html',
  styleUrls: ['./personcard.component.scss']
})
export class PersoncardComponent implements OnInit {
  ROUTES = ROUTES;
  @Input() customerInfo: User;
  constructor(
    private router: Router,
    private scrollToService: ScrollToService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  onMessageClick(selUserId): void {
    this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, selUserId]);
  }

}
