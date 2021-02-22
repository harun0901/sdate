import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sdate-dash-contact',
  templateUrl: './dash-contact.component.html',
  styleUrls: ['./dash-contact.component.scss']
})
export class DashContactComponent implements OnInit {
  typesOfShoes: string[] = ['Aleksei Panov', 'Huskar Malev', 'Podolsky Usev', 'Oleg Japrin', 'Sangiton Bishy'];
  chatForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onAllChatHistoryClicked(): void {
    console.log('a');
  }

  onTransferClicked(): void {
    console.log('a');
  }

}
