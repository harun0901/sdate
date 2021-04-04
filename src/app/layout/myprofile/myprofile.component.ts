import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { GState, ScrollOffset } from '../../core/models/base';
import { NotificationService } from '../../core/services/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationType } from '../../core/models/notificationEntity';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'sdate-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit, OnDestroy {

  private unsubscribeAll: Subject<any> = new Subject<any>();
  ROUTES = ROUTES;
  user: User;
  infoFG: FormGroup;
  uploadData$ = this.uploadService.uploadData$;
  newMsgCount = 0;
  newVisitorCount = 0;
  newLikeCount = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
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
    this.calcInfoCenter();
    this.notificationService.notificationStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((notification) => {
      this.calcInfoCenter();
    });
  }

  calcInfoCenter(): void {
    this.newVisitorCount = 0;
    this.newLikeCount = 0;
    this.newMsgCount = 0;
    const tmpNotificationStore = this.notificationService.notificationStore;
    const res = tmpNotificationStore.map((item) => {
      switch (item.pattern) {
        case NotificationType.Visit:
          this.newVisitorCount ++;
          break;
        case NotificationType.Like:
          this.newLikeCount ++;
          break;
        case NotificationType.Message:
          this.newMsgCount ++;
          break;
      }
    });
  }
  onAvatarClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '450px',
      height: '500px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: UploadType.PersonImageUploading, detailInfo: '', customerId: '' }
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

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root, offset: ScrollOffset });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
