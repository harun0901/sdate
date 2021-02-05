import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  constructor(private openPageSv: OpenPageService) { }

  ngOnInit(): void {
    this.openPageSv.send('likes');
  }

}
