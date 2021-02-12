import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { User, UserShowType } from '../../core/models/user';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ToastrService } from '../../core/services/toastr.service';
import { SignalService } from '../../core/services/signal.service';
import { Signal } from '../../core/models/base';

@Component({
  selector: 'sdate-personcard',
  templateUrl: './personcard.component.html',
  styleUrls: ['./personcard.component.scss']
})
export class PersoncardComponent implements OnInit {
  ROUTES = ROUTES;
  UserShowType = UserShowType;
  @Input() customerInfo: User;
  @Input() customerState: string;
  constructor(
    private router: Router,
    private scrollToService: ScrollToService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private signalService: SignalService,
    ) { }

  ngOnInit(): void {
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  onMessageClick(): void {
    this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, this.customerInfo.id]);
  }

  onAvatarClicked(): void {
    this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.customerInfo.id]);
  }

  async onLikeClicked(): Promise<void> {
    let user;
    if (this.customerState === UserShowType.RANDOM){
      user = await this.userService.likeUser({id: this.customerInfo.id}).toPromise();
    } else if (this.customerState === UserShowType.LIKE){
      user = await this.userService.removeLikeUser({id: this.customerInfo.id}).toPromise();
    }
    this.toastr.success(`You've successfully changed.`);
    this.signalService.sendSignal(Signal.UserListchanged);
  }

}
