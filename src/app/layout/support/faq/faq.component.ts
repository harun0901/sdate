import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ROUTES, toAbsolutePath } from '../../../core/data/routes';
import { ScrollPosition } from '../../../core/data/scroll-pos';
import { OpenPageService } from '../../../core/services/open-page.service';
import { ScrollOffset } from '../../../core/models/base';

@Component({
  selector: 'sdate-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  ROUTES = ROUTES;
  panelOpenState = false;

  constructor(
    private router: Router,
    private scrollToService: ScrollToService,
    private openPageSv: OpenPageService,
    ) { }

  ngOnInit(): void {
    this.openPageSv.send('faq');
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root, offset: ScrollOffset });
    });
  }

}
