import { Component, Inject, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UploadService } from '../../../core/services/upload.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { GiftService } from '../../../core/services/gift.service';
import { GiftDefaultPrice, GState, Signal } from '../../../core/models/base';
import { UploadStatus, UploadType, UploadDialogData } from '../../../core/models/upload';
import { SignalService } from '../../../core/services/signal.service';

@Component({
  selector: 'sdate-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoading = false;

  constructor(
    private signalService: SignalService,
    private uploadService: UploadService,
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private giftService: GiftService,
    private dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInfo: UploadDialogData,
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    if (event.base64.length > Math.pow(2, 13) * 200) {
      this.croppedImage = null;
      this.toastrService.danger('File exceeds the maximum size');
    } else {
      this.croppedImage = event.base64;
    }
  }
  imageLoaded(): void { // image: HTMLImageElement
    // show cropper
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
    // this.toastrService.danger('Only image files are available.');
  }

  async uploadImg(): Promise<void> {
    this.isLoading = true;
    if (this.croppedImage === null) {
      this.isLoading = false;
      this.toastrService.danger('File exceeds the maximum size');
      return;
    }
    const response = await this.uploadService.getUploadURL({fileName: this.imageChangedEvent.target.files[0].name}).toPromise();
    const binary = atob(this.croppedImage.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    const blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});

    const result = await fetch(response.uploadURL, {
      method: 'PUT',
      body: blobData
    });
    if (result.status === UploadStatus.SUCCESS) {
      this.toastrService.success('Image successfully uploaded.');
      const tmpImagePath = response.uploadURL.split('?')[0];
      if (this.dataInfo.type === UploadType.AvatarUploading) {
        await this.userService.updateAvatar({ data: tmpImagePath, id: this.authService.user.id }).toPromise();
        await this.authService.getAuth().toPromise();
      } else if (this.dataInfo.type === UploadType.GiftUploading) {
        const res = await this.giftService.register({path: tmpImagePath, price: GiftDefaultPrice.value, state: GState.Accept}).toPromise();
        this.giftService.setGifts(res);
      } else if (this.dataInfo.type === UploadType.PersonImageUploading) {
        const tempId = (this.dataInfo.customerId !== '' ? this.dataInfo.customerId : this.authService.user.id);
        const res = await this.uploadService.register({
          uploaderId: tempId,
          type: this.dataInfo.type,
          data: tmpImagePath,
          state: GState.Accept,
        }).toPromise();
        await this.uploadService.getByIdState({ uploaderId: tempId, state: GState.Accept });
      } else if (this.dataInfo.type === UploadType.CustomerAvatarUploading) {
        await this.userService.updateAvatar({ data: tmpImagePath, id: this.dataInfo.customerId }).toPromise();
        this.signalService.sendSignal(Signal.AVATAR_CHANGED);
      }
      this.isLoading = true;
      this.dialogRef.close();
    } else {
      this.isLoading = true;
      this.toastrService.danger('Image uploading failed. Try again.');
    }
  }

}
