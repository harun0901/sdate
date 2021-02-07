import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'sdate-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(public loginDialog: MatDialog,
              private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLoginClicked($event): void {
    $event.preventDefault();
    const dialogRef = this.loginDialog.open(LoginComponent, {
      panelClass: 'full-panel',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result && result.length) {
      //   if ( result.toString() === 'login success' ) {
      //     this.router.navigate(['home']);
      //   } else {
      //     alert(result.toString());
      //   }
      // }
    });
  }

}
