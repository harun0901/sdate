import { Component, Input, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'sdate-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() customerInfo: User;
  @Input() isOwner: boolean;
  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('profile');
  }

}
