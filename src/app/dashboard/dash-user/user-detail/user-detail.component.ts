import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';

import { DEFAULT_IMAGE, GState, Signal } from '../../../core/models/base';
import { ImageCropperComponent } from '../../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadType } from '../../../core/models/upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { SignalService } from '../../../core/services/signal.service';
import { UpdateUserPayload, USER_STATE, UserDetailDialogForm } from '../../../core/models/user';
import * as option from '../../../core/models/option';
import { PasswordUpdateComponent } from '../password-update/password-update.component';
import { UserService } from '../../../core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'sdate-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {

  isLoading = false;
  uploadData$ = this.uploadService.uploadData$;
  customerFG: FormGroup;
  roleList = option.roleList;
  genderList = option.genderList;
  lookingForList = option.lookingForList;
  bodyList = option.bodyList;
  educationList = option.educationList;
  professionList = option.professionList;
  heightList = option.heightList;
  kidsList = option.kidsList;
  alcoholicList = option.alcoholicList;
  smokerList = option.smokerList;
  relationshipList = option.relationshipList;
  interestedList = option.interestedList;
  languageList = option.languageList;
  stateList = option.stateList;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
  USER_STATE = USER_STATE;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private uploadImgDialog: MatDialog,
    private customerFB: FormBuilder,
    private toastr: ToastrService,
    private passwordDialog: MatDialog,
    private signalService: SignalService,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public customerDetail: UserDetailDialogForm,
  ) {
    this.customerFG = this.customerFB.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      lookingFor: ['', [Validators.required]],
      body: ['', [Validators.required]],
      education: ['', [Validators.required]],
      interestedIn: ['', [Validators.required]],
      kids: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      relationshipStatus: ['', [Validators.required]],
      smoker: ['', [Validators.required]],
      language: ['', [Validators.required]],
      height: ['', [Validators.required]],
      alcohol: ['', [Validators.required]],
      location: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      lastLogin: ['', [Validators.required]],
      ipAddress: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      state: ['', [Validators.required]],
      about: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.customerFG.setValue({
      fullName: this.customerDetail.detail.fullName,
      email: this.customerDetail.detail.email,
      role: this.customerDetail.detail.role,
      gender: this.customerDetail.detail.gender,
      lookingFor: this.customerDetail.detail.lookingFor,
      body: this.customerDetail.detail.body,
      education: this.customerDetail.detail.education,
      interestedIn: this.customerDetail.detail.interestedIn,
      kids: this.customerDetail.detail.kids,
      profession: this.customerDetail.detail.profession,
      relationshipStatus: this.customerDetail.detail.relationshipStatus,
      smoker: this.customerDetail.detail.smoker,
      language: this.customerDetail.detail.language,
      height: this.customerDetail.detail.height,
      alcohol: this.customerDetail.detail.alcohol,
      location: this.customerDetail.detail.location,
      birthday: this.customerDetail.detail.birthday,
      lastLogin: this.customerDetail.detail.lastLogin.toString().substring(0, 19),
      ipAddress: this.customerDetail.detail.ipAddress,
      balance: this.customerDetail.detail.balance,
      state: this.customerDetail.detail.state,
      about: this.customerDetail.detail.about,
    });
    await this.uploadService.getByIdState({uploaderId: this.customerDetail.detail.id, state: GState.Accept});
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll),
    ).subscribe(async pattern => {
      if (pattern === Signal.AVATAR_CHANGED) {
        const res = await this.userService.getUserInfo(this.customerDetail.detail.id).toPromise();
        this.customerDetail.detail.avatar = res.avatar;
      }
    });
  }

  async onSubmitClicked($event): Promise<void> {
    $event.preventDefault();
    // if (this.customerFG.valid) {
    const param: UpdateUserPayload = this.customerFG.value;
    param.id = this.customerDetail.detail.id;
    this.isLoading = true;
    const res = await this.userService.updateAll(param).toPromise();
    if (res !== null) {
      this.toastr.success(`You've successfully updated.`);
      this.isLoading = false;
      this.signalService.sendSignal(Signal.UserListchanged);
    } else {
      this.isLoading = false;
      this.toastr.danger(`You've not update.`);
    }
    // }
  }

  onAvatarClicked(): void {
    if (typeof this.customerDetail.detail !== 'undefined') {
      this.uploadImgDialog.open(ImageCropperComponent, {
        width: '450px',
        height: '500px',
        panelClass: 'full-panel',
        backdropClass: 'custom-backdrop',
        data: {type: UploadType.CustomerAvatarUploading, detailInfo: '', customerId: this.customerDetail.detail.id},
      });
    }
  }

  onUploadClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '450px',
      height: '500px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: UploadType.PersonImageUploading, detailInfo: '', customerId: this.customerDetail.detail.id }
    });
  }

  async onUploadDataClicked(uploadIdInfo: string, dataInfo: string): Promise<void> {
    if (confirm('Are you sure to delete this item?')) {
      const res = await this.uploadService.updateUpload({
        uploadId: uploadIdInfo,
        data: dataInfo,
        state: GState.Decline
      }).toPromise();
      await this.uploadService.getByIdState({uploaderId: this.customerDetail.detail.id, state: GState.Accept});
    }
  }

  onUpdatePassword($event): void {
    $event.preventDefault();
    this.passwordDialog.open(PasswordUpdateComponent, {
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: {detail: this.customerDetail.detail},
    });
  }

  async onDeleteClicked($event): Promise<void> {
    $event.preventDefault();
    if (confirm('Really want to delete this account?')) {
      await this.userService.deleteUser({id: this.customerDetail.detail.id}).toPromise();
      this.isLoading = true;
      this.signalService.sendSignal(Signal.UserListchanged);
      this.dialogRef.close();
    }
  }

  onCloseClicked($event): void {
    $event.preventDefault();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
