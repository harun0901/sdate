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
    });
  }

  async getAllNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getAllNotification().toPromise();
  }
}
