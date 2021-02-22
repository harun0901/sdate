import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-dash-faq',
  templateUrl: './dash-faq.component.html',
  styleUrls: ['./dash-faq.component.scss']
})
export class DashFaqComponent implements OnInit {
  panelOpenState = false;
  isEditBasic: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onEditBasicToggle(): void {
    this.isEditBasic = !this.isEditBasic;
  }
}
