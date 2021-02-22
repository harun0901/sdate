import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-dash-privacy',
  templateUrl: './dash-privacy.component.html',
  styleUrls: ['./dash-privacy.component.scss']
})
export class DashPrivacyComponent implements OnInit {
  isEditBasic: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onEditBasicToggle(): void {
    this.isEditBasic = !this.isEditBasic;
  }
}
