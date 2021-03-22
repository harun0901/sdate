import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';
import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  notificationStore: NotificationEntity[] = [];
  NotificationType = NotificationType;
  // MatPaginator Inputs
  length = 9;
  pageSize = 9;
  pageSizeOptions: number[] = [9, 18, 36, 54];
  startIndex = 0;
  endIndex = 9;

  constructor(
    private notificationService: NotificationService,
    private openPageSv: OpenPageService,
  ) {}

  ngOnInit(): void {
    this.openPageSv.send('inbox');
    this.getAllNotification();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.notificationStore = this.notificationService.notificationStore;
      const res = this.notificationStore.filter(item => {
        if (item.pattern === NotificationType.Message || item.pattern === NotificationType.Gift || item.pattern === NotificationType.Kiss) {
          if (!item.seen) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      this.length = res.length;
    });
  }

  onPaginationChangeEvent($event): void {
    this.startIndex = $event.pageIndex * $event.pageSize;
    this.endIndex = this.startIndex + $event.pageSize;
  }

  async getAllNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getAllNotification().toPromise();
    const res = this.notificationStore.filter(item => {
      if (item.pattern === NotificationType.Message || item.pattern === NotificationType.Gift || item.pattern === NotificationType.Kiss) {
        if (!item.seen) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    this.length = res.length;
  }
}
