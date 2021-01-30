import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdate-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLoginClicked(): void {
    this.router.navigate(['/home']);
  }

}
