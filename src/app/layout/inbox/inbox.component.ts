import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';
import { OpenPageService } from '../../core/services/open-page.service';
import { ScrollPosition } from '../../core/data/scroll-pos';

@Component({
  selector: 'sdate-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  notificationStore: NotificationEntity[] = [];
  inboxNotifications: NotificationEntity[] = [];
  NotificationType = NotificationType;
  // MatPaginator Inputs
  length = 9;
  pageSize = 9;
  pageSizeOptions: number[] = [9, 18, 36, 54];
  startIndex = 0;
  endIndex = 9;
  isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private openPageSv: OpenPageService,
    private scrollToService: ScrollToService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.openPageSv.send('inbox');
    // await this.getAllNotification();
    this.notificationStore = this.notificationService.notificationStore;
    this.inboxNotifications = this.distinctArray(this.notificationStore);
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.notificationStore = this.notificationService.notificationStore;
      this.inboxNotifications = this.distinctArray(this.notificationStore);
      this.length = this.inboxNotifications.length;
    });
  }

  onPaginationChangeEvent($event): void {
    this.startIndex = $event.pageIndex * $event.pageSize;
    this.endIndex = this.startIndex + $event.pageSize;
  }

  // async getAllNotification(): Promise<void> {
  //   try{
  //     this.isLoading = true;
  //     this.notificationStore = await this.notificationService.getAllNotification().toPromise();
  //     this.inboxNotifications = this.distinctArray(this.notificationStore);
  //     this.length = this.inboxNotifications.length;
  //   } catch (e) {
  //     this.isLoading = false;
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  distinctArray(notifylist: NotificationEntity[]): NotificationEntity[] {
    const preList = notifylist;
    let resList: NotificationEntity[] = [];
    const senderIdList: string[] = [];
    const patternList: string[] = [];
    preList.map(item => {
      if (senderIdList.indexOf(item.sender.id) > -1) {
        return item;
      } else {
        if (item.pattern === NotificationType.Message
          || item.pattern === NotificationType.Gift
          || item.pattern === NotificationType.Kiss
          || item.pattern === NotificationType.Gif
        ) {
          resList.push(item);
          senderIdList.push(item.sender.id);
          patternList.push(item.pattern);
        }
        return item;
      }
    });
    resList = resList.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return Number(db) - Number(da);
    });
    return resList;
  }
}
