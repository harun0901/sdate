import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { OpenPageService } from '../../core/services/open-page.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { ToastrService } from '../../core/services/toastr.service';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { UploadType } from '../../core/models/upload';
import { UploadService } from '../../core/services/upload.service';
import { GState } from '../../core/models/base';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  user: User;
  infoFG: FormGroup;
  uploadData$ = this.uploadService.uploadData$;
  constructor(
    private openPageSv: OpenPageService,
    private authService: AuthService,
    private infoFB: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private uploadService: UploadService,
    private scrollToService: ScrollToService,
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
    this.uploadService.getByIdState({uploaderId: this.authService.user.id, state: GState.Accept});
  }

  onAvatarClicked(): void {
    window.scroll(0, 0);
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '450px',
      height: '500px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: UploadType.PersonImageUploading, detailInfo: '' }
    });
  }

  async onUploadDataClicked(uploadIdInfo: string, dataInfo: string): Promise<void> {
    if (confirm('Are you sure to delete this item?')) {
      const res = await this.uploadService.updateUpload({
        uploadId: uploadIdInfo,
        data: dataInfo,
        state: GState.Decline
      }).toPromise();
      this.uploadService.getByIdState({uploaderId: this.authService.user.id, state: GState.Accept});
    }
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
