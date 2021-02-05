import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

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
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.isLoading = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async onLoginClicked($event): Promise<void> {
    // if (!areFormControlsValid(this.loginForm, ['password', 'confirmPassword'])) {
    //   this.toastr.warning('Password mismatch. Please type password and confirm password correctly.');
    //   return;
    // }
    // // $event.preventDefault();
    // console.log(this.loginForm.value);
    // -------------------------auth api integration--------------------------------
    this.isLoading = true;

    const loginInfo = this.loginForm.value;
    await this.auth.login(loginInfo).toPromise();
    // -----------------------------------------------------------------------------
    let retStr = 'incorrect email/password.';
    if (this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'adminadmin') {
      retStr = 'login success';
      this.dialogRef.close(retStr);
    } else {
      alert(retStr);
    }
  }

}
