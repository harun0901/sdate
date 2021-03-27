import { Component, OnDestroy, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { User, UserShowType } from '../../core/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'sdate-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  isLoading = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private openPageSv: OpenPageService,
    private userService: UserService,
    private signalService: SignalService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.searchService.setIgnoreFlag(true);
    this.openPageSv.send('visitors');
    this.userState = UserShowType.VISITOR;
    this.getVisitUser();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.VisitorListChanged) {
        this.getVisitUser();
      } else if (pattern === Signal.SearchAgain) {
        this.getVisitUser();
      }
    });
  }

  async getVisitUser(): Promise<void> {
    try{
      this.isLoading = true;
      this.userList = await this.userService.getVisitUser().toPromise();
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
