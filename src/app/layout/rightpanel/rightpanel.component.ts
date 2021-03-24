import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

import { NotificationService } from '../../core/services/notification.service';
import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';

@Component({
  selector: 'sdate-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500)
        // animate(500, style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class RightpanelComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  notificationStore: NotificationEntity[];
  selectedSearchKey = NotificationType.Any;
  NotificationType = NotificationType;
  isOpen = false;

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
      this.notificationStore.sort((a, b) => {
        const da = new Date(a.createdAt);
        const db = new Date(b.createdAt);
        return Number(db) - Number(da);
      });
      this.isOpen = !this.isOpen;
    });
  }

  setSearchKey(keyword: NotificationType): void {
    if (this.selectedSearchKey === keyword) {
      this.selectedSearchKey = NotificationType.Any;
    } else {
      this.selectedSearchKey = keyword;
    }
  }

  async getNotSeenNotification(): Promise<void> {
    this.notificationStore = await this.notificationService.getNotSeenNotification().toPromise();
    this.notificationService.setNotificationStore(this.notificationStore);
    this.notificationStore.sort((a, b) => {
      const da = new Date(a.createdAt);
      const db = new Date(b.createdAt);
      return Number(db) - Number(da);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
