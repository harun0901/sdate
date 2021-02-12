import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { User, UserShowType } from '../../core/models/user';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';
import { Subject } from 'rxjs';

@Component({
  selector: 'sdate-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private openPageSv: OpenPageService,
    private userService: UserService,
    private signalService: SignalService,
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('favorite');
    this.userState = UserShowType.FAVORITE;
    this.getFavoriteUser();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.UserListchanged) {
        this.getFavoriteUser();
      }
    });
  }

  async getFavoriteUser(): Promise<void> {
    this.userList = await this.userService.getFavoriteUser().toPromise();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
