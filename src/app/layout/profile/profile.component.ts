import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('profile');
  }

}
