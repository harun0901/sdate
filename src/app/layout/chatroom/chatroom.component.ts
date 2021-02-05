import { Component, Input, OnInit } from '@angular/core';
import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  constructor(
    private openPageSv: OpenPageService
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('chatroom');
  }

}
