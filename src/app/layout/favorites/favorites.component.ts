import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DEFAULT_IMAGE } from '../../core/models/base';
import { OpenPageService } from '../../core/services/open-page.service';
import { UserService } from '../../core/services/user.service';
import { SignalService } from '../../core/services/signal.service';
import { User, UserShowType } from '../../core/models/user';
import { takeUntil } from 'rxjs/operators';
import { Signal } from '../../core/models/base';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'sdate-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  userList: User[];
  userState: string;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
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
    this.openPageSv.send('favorite');
    this.userState = UserShowType.FAVORITE;
    this.getFavoriteUser();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(pattern => {
      if (pattern === Signal.UserListchanged) {
        this.getFavoriteUser();
      } else if (pattern === Signal.SearchAgain) {
        this.getFavoriteUser();
      }
    });
  }

  async getFavoriteUser(): Promise<void> {
    try{
      this.isLoading = true;
      this.userList = await this.userService.getFavoriteUser().toPromise();
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
