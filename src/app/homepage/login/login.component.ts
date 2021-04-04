import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from '../../core/services/toastr.service';
import { USER_STATE } from '../../core/models/user';

@Component({
  selector: 'sdate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  async onLoginClicked(): Promise<void> {
    try {
      this.isLoading = true;
      const loginInfo = this.loginForm.value;
      /*********real mode***************/
      await this.auth.login(loginInfo).toPromise();
      const token = await this.auth.decodeToken();
      if (token.state === USER_STATE.DELETED) {
        this.toastr.danger(`You are blocked from the support team.`);
      } else {
        this.auth.navigateByUserRole(token.role);
        this.toastr.success(`You've successfully logged in.`);
      }
      /*********test mode***************/
      // if (loginInfo.email !== 'admin@gmail.com' || loginInfo.password !== 'adminadmin') {
      //   throw new Error('invalid ID');
      // }
      // this.auth.navigateByUserRole(UserRole.Admin);
      /*********test mode***************/
      this.dialogRef.close();
    } catch (e) {
      this.toastr.danger(`Invalid email or password. Please try again.`);
    } finally {
      this.isLoading = false;
    }
  }

}
