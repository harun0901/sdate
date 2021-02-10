import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  user: User;
  constructor(
    private openPageSv: OpenPageService,
    private authService: AuthService,
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    this.openPageSv.send('my-profile');
  }

}
