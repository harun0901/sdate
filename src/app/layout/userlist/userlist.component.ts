import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { ShowLimitCount, User, UserShowType } from '../../core/models/user';
import { OpenPageService } from '../../core/services/open-page.service';
import { SignalService } from '../../core/services/signal.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Signal } from '../../core/models/base';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'sdate-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private userService: UserService,
    private openPageSv: OpenPageService,
    private signalService: SignalService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchService.setIgnoreFlag(true);
    this.openPageSv.send('chats');
    this.userState = UserShowType.RANDOM;
    this.getRandomUserByLimit();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.UserListchanged) {
        this.getRandomUserByLimit();
      } else if (pattern === Signal.SearchAgain) {
        this.getRandomUserByLimit();
      }
    });
  }

  async getRandomUserByLimit(): Promise<void> {
    this.userList = await this.userService.getRandomUserByLimit({
      limit_count: ShowLimitCount.UserShowCount.toString(),
      searchKey: {
        lookingFor: this.searchService.searchKey.lookingFor,
        startAge: this.searchService.searchKey.startAge,
        endAge: this.searchService.searchKey.endAge,
        location: this.searchService.searchKey.location,
        ignoreFlag: this.searchService.searchKey.ignoreFlag,
      }}).toPromise();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
