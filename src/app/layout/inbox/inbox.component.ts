import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('inbox');
  }

}
