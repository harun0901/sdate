import { Component, OnInit } from '@angular/core';
import { single } from './data';
import { UserService } from '../core/services/user.service';
import { ChatService } from '../core/services/chat.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'sdate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  onlineUserCount = 0;
  fakeUserCount = 0;
  customerCount = 0;
  messageCount = 0;
  kissCount = 0;
  giftCount = 0;
  likeCount = 0;
  favoriteCount = 0;
  visitCount = 0;
  userCreateAnalyze: any;
  single: any[];
  multi: any[];

  view: any[] = [1200, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Users';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2030a0']
  };

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private notificationService: NotificationService,
  ) {
    Object.assign(this, { single });
  }

  onSelect(event): void {
    console.log(event);
  }

  ngOnInit(): void {
    this.initializeCount();
  }

  async initializeCount(): Promise<void> {
    this.onlineUserCount = await this.userService.getOnlineUserCount().toPromise();
    this.fakeUserCount = await this.userService.getFakeUserCount().toPromise();
    this.customerCount = await this.userService.getCustomerCount().toPromise();
    this.messageCount = await this.chatService.messageCount().toPromise();
    this.kissCount = await this.chatService.kissCount().toPromise();
    this.giftCount = await this.chatService.giftCount().toPromise();
    this.likeCount = await this.notificationService.likeCount().toPromise();
    this.favoriteCount = await this.notificationService.favoriteCount().toPromise();
    this.visitCount = await this.notificationService.visitCount().toPromise();
    // this.userCreateAnalyze = await this.userService.userCreateAnalyze().toPromise();
    // console.log('userCreateAnalyze = ', this.userCreateAnalyze);
  }

}
