import { Component, OnDestroy, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('my-profile');
  }

}
