import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-dash-terms',
  templateUrl: './dash-terms.component.html',
  styleUrls: ['./dash-terms.component.scss']
})
export class DashTermsComponent implements OnInit {

  isEditBasic: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onEditBasicToggle(): void {
    this.isEditBasic = !this.isEditBasic;
  }

}
