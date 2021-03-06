import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';

@Component({
  selector: 'sdate-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss']
})
export class RightpanelComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  notificationStore: NotificationEntity[];
  selectedSearchKey = NotificationType.Any;
  NotificationType = NotificationType;

  constructor(
    private notificationService: NotificationService,
  ) {
    this.notificationStore = [];
  }

  ngOnInit(): void {
    this.getNotSeenNotification();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.notificationStore = this.notificationService.notificationStore;
    });
  }

  setSearchKey(keyword: NotificationType): void {
    this.selectedSearchKey = keyword;
  }

  async getNotSeenNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getNotSeenNotification().toPromise();
    this.notificationService.setNotificationStore(this.notificationStore);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
