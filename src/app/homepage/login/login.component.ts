import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'sdate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });


  constructor(private router: Router,
              private dialogRef: MatDialogRef<LoginComponent>,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onLoginClicked($event): void {
    $event.preventDefault();
    let retStr = 'incorrect email/password.';
    if (this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'adminadmin') {
      retStr = 'login success';
      this.dialogRef.close(retStr);
    } else {
      alert(retStr);
    }
  }

}
