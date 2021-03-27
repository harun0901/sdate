import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

import { UserService } from '../../core/services/user.service';
import { ShowLimitCount, User, UserShowType } from '../../core/models/user';
import { OpenPageService } from '../../core/services/open-page.service';
import { SignalService } from '../../core/services/signal.service';
import { Signal } from '../../core/models/base';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'sdate-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  length = 9;
  pageSize = 9;
  pageSizeOptions: number[] = [9, 18, 36, 54];
  startIndex = 0;
  endIndex = 9;
  isLoading = false;

  userList: User[];
  userState: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private userService: UserService,
    private openPageSv: OpenPageService,
    private signalService: SignalService,
    private searchService: SearchService,
  ) {}

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
    try{
      this.isLoading = true;
      this.userList = await this.userService.getRandomUserByLimit({
        limit_count: ShowLimitCount.UserShowCount.toString(),
        searchKey: {
          lookingFor: this.searchService.searchKey.lookingFor,
          startAge: this.searchService.searchKey.startAge,
          endAge: this.searchService.searchKey.endAge,
          location: this.searchService.searchKey.location,
          ignoreFlag: this.searchService.searchKey.ignoreFlag,
        }}).toPromise();
      this.length = this.userList.length;
    } catch (e) {
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  onPaginationChangeEvent($event): void {
    this.startIndex = $event.pageIndex * $event.pageSize;
    this.endIndex = this.startIndex + $event.pageSize;
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
