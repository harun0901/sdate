import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'sdate-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(
    public loginDialog: MatDialog,
    public regDialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLoginClicked(): void {
    this.loginDialog.open(LoginComponent, {
      panelClass: 'full-panel',
    });
  }

  onRegisterClicked(): void {
    this.regDialog.open(RegistrationComponent, {
      panelClass: 'full-panel',
    });
  }
}
