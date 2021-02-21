import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'sdate-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [1200, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Users';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2030a0']
  };

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event): void {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
