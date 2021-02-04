import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { areFormControlsValid } from '../../core/utils/form.util';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'sdate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });


  constructor(private router: Router,
              private dialogRef: MatDialogRef<LoginComponent>,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              ) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onLoginClicked($event): void {
    this.toastr.warning('Password mismatch. Please type password and confirm password correctly.');
    // if (!areFormControlsValid(this.loginForm, ['password', 'confirmPassword'])) {
    //   this.toastr.warning('Password mismatch. Please type password and confirm password correctly.');
    //   return;
    // }
    // // $event.preventDefault();
    // console.log(this.loginForm.value);
    let retStr = 'incorrect email/password.';
    if (this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'adminadmin') {
      retStr = 'login success';
      this.dialogRef.close(retStr);
    } else {
      alert(retStr);
    }
  }

}
