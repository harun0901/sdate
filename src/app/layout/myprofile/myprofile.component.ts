import { Component, OnInit } from '@angular/core';

import { OpenPageService } from '../../core/services/open-page.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  user: User;
  constructor(
    private openPageSv: OpenPageService,
    private authService: AuthService,
    public uploadImgDialog: MatDialog,
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    this.openPageSv.send('my-profile');
  }

  onAvatarClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '350px',
      panelClass: 'full-panel',
    });
  }

}
