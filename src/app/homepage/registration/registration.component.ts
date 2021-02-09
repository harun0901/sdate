import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'sdate-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isLoading: boolean;
  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      age: [18, [Validators.required]],
      gender: ['male', [Validators.required]],
      lookingFor: ['female', [Validators.required]],
      agreePrivacy: ['true', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  async onRegistrationClicked(): Promise<void> {
    try {
      this.isLoading = true;
      const regInfo = this.registrationForm.value;
      /*********real mode***************/
      await this.auth.register(regInfo).toPromise();
      const token = await this.auth.decodeToken();
      this.auth.navigateByUserRole(token.role);
      /*********test mode***************/
      // if (loginInfo.email !== 'admin@gmail.com' || loginInfo.password !== 'adminadmin') {
      //   throw new Error('invalid ID');
      // }
      // this.auth.navigateByUserRole(UserRole.Admin);
      /*********test mode***************/
      this.dialogRef.close();
      this.toastr.success(`You've successfully Registered.`);
    } catch (e) {
      this.toastr.danger(`Invalid email or password. Please try again.`);
    } finally {
      this.isLoading = false;
    }
  }

}
