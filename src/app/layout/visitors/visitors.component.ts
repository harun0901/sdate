import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})
export class VisitorsComponent implements OnInit {

  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('visitors');
  }

}
