import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { User, UserShowType } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';
import { Subject } from 'rxjs';

@Component({
  selector: 'sdate-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private openPageSv: OpenPageService,
    private userService: UserService,
    private signalService: SignalService,
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('likes');
    this.userState = UserShowType.LIKE;
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
  }

  async getLikedUser(): Promise<void> {
    this.userList = await this.userService.getLikedUser().toPromise();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
