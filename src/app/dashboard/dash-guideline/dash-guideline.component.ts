import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdate-dash-guideline',
  templateUrl: './dash-guideline.component.html',
  styleUrls: ['./dash-guideline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashGuidelineComponent implements OnInit {
  isEditBasic: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onEditBasicToggle(): void {
    this.isEditBasic = !this.isEditBasic;
  }
}
