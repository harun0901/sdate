import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from '../../core/services/toastr.service';
import { UserRole } from '../../core/models/auth';
import { throwError } from 'rxjs';

@Component({
  selector: 'sdate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.isLoading = false;
    this.loginForm = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['adminadmin', [Validators.required, Validators.minLength(5)]],
    });
  }

  async onLoginClicked(): Promise<void> {
    // -------------------------auth api integration--------------------------------
    try {
      this.isLoading = true;
      const loginInfo = this.loginForm.value;
      // await this.auth.login(loginInfo).toPromise();
      // const token = await this.auth.decodeToken();
      // this.auth.navigateByUserRole(token.role);
      /*********test mode***************/
      if (loginInfo.email !== 'admin@gmail.com' || loginInfo.password !== 'adminadmin') {
        throw new Error('invalid ID');
      }
      this.auth.navigateByUserRole(UserRole.Admin);
      /*********test mode***************/
      this.dialogRef.close();
      this.toastr.success(`You've successfully logged in.`);
    } catch (e) {
      this.toastr.danger(`Invalid email or password. Please try again.`);
    } finally {
      this.isLoading = false;
    }
  }

}
