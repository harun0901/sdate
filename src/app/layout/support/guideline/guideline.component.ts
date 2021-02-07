import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { ROUTES, toAbsolutePath } from '../../../core/data/routes';
import { ScrollPosition } from '../../../core/data/scroll-pos';

@Component({
  selector: 'sdate-guideline',
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidelineComponent implements OnInit {
  ROUTES = ROUTES;

  constructor(
    private router: Router,
    private scrollToService: ScrollToService,
    ) { }

  ngOnInit(): void {
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
