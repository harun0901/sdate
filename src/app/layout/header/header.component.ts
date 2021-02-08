import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { SocketService } from '../../core/services/socket.service';
import { ChatService } from '../../core/services/chat.service';
import { IsMinePipe } from '../../ui-kit/pipes/is-mine.pipe';
import { Chat } from '../../core/models/chat';

@Component({
  selector: 'sdate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [IsMinePipe]
})
export class HeaderComponent implements OnInit {
  ROUTES = ROUTES;
  total = 0;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private scrollToService: ScrollToService,
    private socketService: SocketService,
    private chatService: ChatService,
    private isMinePipe: IsMinePipe,
    ) { }

  ngOnInit(): void {
    this.subscribeMessages();
    this.chatService.totalUnreadChanged$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.loadUnreadMessages();
    });
    this.loadUnreadMessages();

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
          alert('One Message received');
        }
      }
    );
  }



  private async loadUnreadMessages(): Promise<void> {
    try {
      this.total = await this.chatService.totalUnreadCount().toPromise();
    } catch (e) {
      console.log(e);
    }
  }



  logOut(): void {
    this.auth.logout();
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

}
