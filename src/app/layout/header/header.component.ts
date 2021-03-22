import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DEFAULT_IMAGE } from '../../core/models/base';
import { AuthService } from '../../core/services/auth.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { SocketService } from '../../core/services/socket.service';
import { ChatService } from '../../core/services/chat.service';
import { IsMinePipe } from '../../ui-kit/pipes/is-mine.pipe';
import { Chat, ChatType } from '../../core/models/chat';
import { ChatStoreService } from '../../core/services/chat-store.service';
import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';
import { Signal } from '../../core/models/base';
import { SignalService } from '../../core/services/signal.service';
import { User } from '../../core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'sdate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IsMinePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {
  ROUTES = ROUTES;
  userInfo: User;
  total = 0;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
  newMsgCount = 0;
  newVisitorCount = 0;
  newLikeCount = 0;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private paymentDialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private scrollToService: ScrollToService,
    private socketService: SocketService,
    private chatService: ChatService,
    private isMinePipe: IsMinePipe,
    private chatStoreService: ChatStoreService,
    private notificationService: NotificationService,
    private signalService: SignalService,
    ) { }

  ngOnInit(): void {
    this.userInfo = this.auth.user;
    this.subscribeMessages();
    this.subscribeEvent();
    this.auth.user$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((item) => {
      this.userInfo = item;
    });
    this.chatService.totalUnreadChanged$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
    });
    this.calcInfoCenter();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.calcInfoCenter();
    });
  }

  calcInfoCenter(): void {
    this.newVisitorCount = 0;
    this.newLikeCount = 0;
    this.newMsgCount = 0;
    const tmpNotificationStore = this.notificationService.notificationStore;
    const res = tmpNotificationStore.map((item) => {
      if (!item.seen) {
        switch (item.pattern) {
          case NotificationType.Visit:
            this.newVisitorCount ++;
            break;
          case NotificationType.Like:
            this.newLikeCount ++;
            break;
          case NotificationType.Message:
            this.newMsgCount ++;
            break;
          case NotificationType.Gift:
            this.newMsgCount ++;
            break;
          case NotificationType.Kiss:
            this.newMsgCount ++;
            break;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private async subscribeMessages(): Promise<void> {
    this.socketService.subscribeMessages().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(
      (message: Chat) => {
        if (this.isMinePipe.transform(message)) {
          if (message.sender.id === this.chatStoreService.chatroomUserId) {
            this.chatStoreService.addRoomChat(message);
          } else {
            this.chatStoreService.addChat(message.sender.id, message);
          }
        }
      }
    );
  }

  private async subscribeEvent(): Promise<void> {
    this.socketService.subscribeEvents().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(
      (notification: NotificationEntity) => {
          this.notificationService.addNotificationOnPanel(notification);
          if (notification.pattern === NotificationType.Visit) {
            this.signalService.sendSignal(Signal.VisitorListChanged);
          }
      }
    );
  }

  onPaymentClicked(): void {
    this.paymentDialog.open(PaymentComponent, {
      width: '300px',
      panelClass: 'word-panel',
      backdropClass: 'custom-backdrop'
    });
  }

  logOut(): void {
    this.socketService.disconnect(this.auth.user.id);
    this.auth.logout();
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
