import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { OpenPageService } from '../core/services/open-page.service';
import { ChatStoreService } from '../core/services/chat-store.service';
import { Chat } from '../core/models/chat';

@Component({
  selector: 'sdate-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  openPage: string;
  chatIdStore: string[];
  exceptPageList: string[];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private openPageSv: OpenPageService,
    private chatStoreService: ChatStoreService,
    private cRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.exceptPageList = ['profile', 'my-profile', 'chatroom'];
    this.chatIdStore = [];
    this.openPage = 'home';
    this.openPageSv.sendOpenPage$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(nextPage => {
      this.openPage = nextPage;
      this.cRef.detectChanges();
    });
    this.chatStoreService.chatStoreEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(event => {
      this.chatIdStore = Array.from(this.chatStoreService.chatStore.keys());
      // this.cRef.detectChanges(); --this is making erros
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
