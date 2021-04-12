import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ROUTES, toAbsolutePath } from 'src/app/core/data/routes';

import { DEFAULT_IMAGE, ScrollOffset } from '../../../core/models/base';
import { ScrollPosition } from '../../../core/data/scroll-pos';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationDescription, NotificationEntity, NotificationType } from '../../../core/models/notificationEntity';

@Component({
  selector: 'sdate-inbox-item',
  templateUrl: './inbox-item.component.html',
  styleUrls: ['./inbox-item.component.scss']
})
export class InboxItemComponent implements OnInit {
  ROUTES = ROUTES;
  description: string;
  dataLabel: string;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
  NotificationType = NotificationType;
  isLoading = false;
  @Input() notification: NotificationEntity;
  constructor(
    private notificationService: NotificationService,
    private scrollToService: ScrollToService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dataLabel = 'read';
    switch (this.notification.pattern) {
      case NotificationType.Visit:
        this.description = NotificationDescription.Visit;
        this.dataLabel = 'visit';
        break;
      case NotificationType.Favorite:
        this.description = NotificationDescription.Favorite;
        this.dataLabel = 'visit';
        break;
      case NotificationType.Like:
        this.description = NotificationDescription.Like;
        this.dataLabel = 'visit';
        break;
      case NotificationType.Message:
        this.description = this.notification.content;
        this.dataLabel = 'read';
        break;
      case NotificationType.Gift:
        this.description = NotificationDescription.Gift;
        this.dataLabel = 'read';
        break;
      case NotificationType.Gif:
        this.description = NotificationDescription.Gif;
        this.dataLabel = 'read';
        break;
      case NotificationType.Kiss:
        this.description = NotificationDescription.Kiss;
        this.dataLabel = 'read';
        break;
      default:
        this.description = '';
    }
  }
  async onNotificationClicked(): Promise<void> {
    const res = await this.notificationService.UpdateInboxItem({
      senderId: this.notification.sender.id,
      receiverId: this.notification.receiver.id,
      pattern: this.notification.pattern,
      content: this.notification.content
    }).toPromise();
    this.notificationService.setNotificationStore(res);
    if (this.notification.pattern === NotificationType.Message
      || this.notification.pattern === NotificationType.Kiss
      || this.notification.pattern === NotificationType.Gift) {
      this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, this.notification.sender.id]);
    } else {
      this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.notification.sender.id]);
    }
  }

  async onCloseClicked(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await this.notificationService.DeleteInboxItem({
        senderId: this.notification.sender.id,
        receiverId: this.notification.receiver.id,
        pattern: this.notification.pattern,
        content: this.notification.content
      }).toPromise();
      this.notificationService.setNotificationStore(res);
    } catch (e) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root, offset: ScrollOffset });
    });
  }

}
