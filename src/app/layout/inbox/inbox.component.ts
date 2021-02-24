import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { NotificationEntity } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'sdate-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  notificationStore: NotificationEntity[];

  constructor(
    private notificationService: NotificationService,
  ) {
    this.notificationStore = [];
  }

  ngOnInit(): void {
    this.getAllNotification();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.notificationStore = this.notificationService.notificationStore;
    });
  }

  async getAllNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getAllNotification().toPromise();
    this.notificationService.setNotificationStore(this.notificationStore);
  }
}
