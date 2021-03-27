import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { OpenPageService } from '../../core/services/open-page.service';
import { User, UserShowType } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';
import { Subject } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { NotificationEntity, NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'sdate-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit, OnDestroy {
  userList: User[];
  UserShowType = UserShowType;
  notificationStore: NotificationEntity[] = [];
  NotificationType = NotificationType;
  isLoading = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private scrollToService: ScrollToService,
    private openPageSv: OpenPageService,
    private userService: UserService,
    private signalService: SignalService,
    private searchService: SearchService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.searchService.setIgnoreFlag(true);
    this.openPageSv.send('likes');
    this.getLikedUser();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.UserListchanged) {
        this.getLikedUser();
      } else if (pattern === Signal.SearchAgain) {
        this.getLikedUser();
      }
    });
    this.getAllNotification();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.notificationStore = this.notificationService.notificationStore;
    });
  }

  async getAllNotification(): Promise<void> {
    try{
      this.isLoading = true;
      this.notificationStore = await this.notificationService.getAllNotification().toPromise();
    } catch (e) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  async getLikedUser(): Promise<void> {
    try{
      this.isLoading = true;
      this.userList = await this.userService.getLikedUser().toPromise();
    } catch (e) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
