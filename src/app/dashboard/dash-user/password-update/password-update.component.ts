import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserDetailDialogForm } from '../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../../core/services/toastr.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sdate-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {

  isLoading = false;
  passwordFG: FormGroup;
  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    public passwordFB: FormBuilder,
    public dialogRef: MatDialogRef<PasswordUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public customerDetail: UserDetailDialogForm,
  ) {
    this.passwordFG = this.passwordFB.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
  }

  async onSubmitted(): Promise<void> {
    if (this.passwordFG.valid) {
      if (this.passwordFG.value.password !== this.passwordFG.value.confirmPassword) {
        this.toastrService.danger('Password and confirmPassword must be same.');
      } else {
        const idStr = this.customerDetail.detail.id;
        const passwordStr = this.passwordFG.value.password;
        const res = await this.userService.updatePassword({id: idStr, password: passwordStr}).toPromise();
        this.toastrService.success('Password updated correctly.');
      }
    }
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }
}
