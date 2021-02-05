import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sdate-check-mark-circle',
  templateUrl: './check-mark-circle.component.html',
  styleUrls: ['./check-mark-circle.component.scss']
})
export class CheckMarkCircleComponent implements OnInit {

  @Input() checked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
