import { Component, Input, OnInit } from '@angular/core';
import { ROUTES, toAbsolutePath } from 'src/app/core/data/routes';
import { NotificationDescription, NotificationEntity, NotificationType } from '../../../core/models/notificationEntity';
import { NotificationService } from '../../../core/services/notification.service';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';
import { ScrollPosition } from '../../../core/data/scroll-pos';

@Component({
  selector: 'sdate-inbox-item',
  templateUrl: './inbox-item.component.html',
  styleUrls: ['./inbox-item.component.scss']
})
export class InboxItemComponent implements OnInit {
  ROUTES = ROUTES;
  description: string;
  dataLabel: string;
  sampleImageUrl = '../../../assets/images/uploaded/avatar.png';
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
      default:
        this.description = '';
    }
  }
  onNotificationClicked(): void {
    if (this.notification.pattern === NotificationType.Message) {
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