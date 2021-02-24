import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationEntity } from '../../core/models/notificationEntity';

@Component({
  selector: 'sdate-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss']
})
export class RightpanelComponent implements OnInit {
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
      // this.notificationStore.push(notification);
      this.notificationStore = this.notificationService.notificationStore;
    });
  }

  async getAllNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getAllNotification().toPromise();
    this.notificationService.setNotificationStore(this.notificationStore);
  }
}
