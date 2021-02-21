import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-dash-total',
  templateUrl: './dash-total.component.html',
  styleUrls: ['./dash-total.component.scss']
})
export class DashTotalComponent implements OnInit {
  @Input() icon = '';
  @Input() color = 'white';
  @Input() title = 'Online';
  @Input() description = '0';
  constructor() { }

  ngOnInit(): void {
  }

}
