import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss']
})
export class LeftpanelComponent implements OnInit {
  startAge: number;
  endAge: number;
  currentValues: number[];
  constructor() { }

  ngOnInit(): void {
    this.startAge = 10;
    this.endAge = 120;
  }

  onSliderChange(selectedValues: number[]): void {
    this.currentValues = selectedValues;
    this.startAge = this.currentValues[0];
    this.endAge = this.currentValues[1];
  }

}
