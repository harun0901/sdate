import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  userList: User[];
  constructor(
    private userService: UserService,
    private openPageSv: OpenPageService,
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('chats');
    this.getRandomUserByLimit();
  }

  async getRandomUserByLimit(): Promise<void> {
    this.userList = await this.userService.getRandomUserByLimit({limit_count: '9'}).toPromise();
  }

}
