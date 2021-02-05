import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { OpenPageService } from '../core/services/open-page.service';

@Component({
  selector: 'sdate-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  openPage: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private openPageSv: OpenPageService,
    private cRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.openPage = 'home';
    this.openPageSv.sendOpenPage$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(nextPage => {
      this.openPage = nextPage;
      this.cRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
