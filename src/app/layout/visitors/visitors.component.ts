import { Component, OnDestroy, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { User, UserShowType } from '../../core/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';

@Component({
  selector: 'sdate-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private openPageSv: OpenPageService,
    private userService: UserService,
    private signalService: SignalService,
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('visitors');
    this.userState = UserShowType.VISITOR;
    this.getVisitUser();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.VisitorListChanged) {
        this.getVisitUser();
      }
    });
  }

  async getVisitUser(): Promise<void> {
    this.userList = await this.userService.getVisitUser().toPromise();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
