import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { DEFAULT_IMAGE } from '../../core/models/base';
import { NotificationService } from '../../core/services/notification.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { NotificationEntity, NotificationDescription, NotificationType } from '../../core/models/notificationEntity';

@Component({
  selector: 'sdate-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  ROUTES = ROUTES;
  description: string;
  dataLabel: string;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
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
        this.description = NotificationDescription.Message;
        this.dataLabel = 'read';
        break;
      case NotificationType.Gift:
        this.description = NotificationDescription.Gift;
        this.dataLabel = 'read';
        break;
      case NotificationType.Kiss:
        this.description = NotificationDescription.Kiss;
        this.dataLabel = 'read';
        break;
      case NotificationType.Block:
        this.description = NotificationDescription.Block;
        this.dataLabel = 'visit';
        break;
      default:
        this.description = '';
    }
  }

  onNotificationClicked(): void {
    if (this.notification.pattern === NotificationType.Message ||
      this.notification.pattern === NotificationType.Gift ||
      this.notification.pattern === NotificationType.Kiss) {
      this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, this.notification.sender.id]);
    } else {
      this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.notification.sender.id]);
    }
  }

  async onCloseClicked(): Promise<void> {
    const res = await this.notificationService.updateNotification({id: this.notification.id}).toPromise();
    this.notificationService.setNotificationStore(res);
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
