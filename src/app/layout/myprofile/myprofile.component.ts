import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { OpenPageService } from '../../core/services/open-page.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  user: User;
  infoFG: FormGroup;
  constructor(
    private openPageSv: OpenPageService,
    private authService: AuthService,
    private infoFB: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public uploadImgDialog: MatDialog,
  ) {
    this.user = authService.user;
    this.infoFG = this.infoFB.group({
      birthday: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.openPageSv.send('my-profile');
    this.setInfoFGData();
  }

  onAvatarClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '350px',
      panelClass: 'full-panel',
    });
  }

  setInfoFGData(): void {
    if (this.user) {
      this.infoFG.setValue({
        birthday: this.user.birthday,
        email: this.user.email,
      });
    }
  }

  async onInfoFGSubmitted(): Promise<void> {
    this.user = await this.userService.updateUserInfo(this.infoFG.value, this.user.id).toPromise();
    this.toastr.success(`You've successfully saved.`);
  }

}
