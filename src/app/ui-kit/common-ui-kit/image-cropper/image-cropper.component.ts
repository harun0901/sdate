import { Component, Inject, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageService } from '../../../core/services/image.service';
import { ToastrService } from '../../../core/services/toastr.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { GiftService } from '../../../core/services/gift.service';
import { GiftState } from '../../../core/models/gift';
import { UploadStatus, UploadType, UploadDialogData } from '../../../core/models/upload';

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
    private imageService: ImageService,
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
    this.croppedImage = event.base64;
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
    const response = await this.imageService.getUploadURL({fileName: this.imageChangedEvent.target.files[0].name}).toPromise();
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
        await this.userService.updateAvatar({ id: tmpImagePath }).toPromise();
        await this.authService.getAuth().toPromise();
      } else if (this.dataInfo.type === UploadType.GiftUploading) {
        const res = await this.giftService.register({path: tmpImagePath, state: GiftState.Accept}).toPromise();
        this.giftService.setGifts(res);
      }
      this.isLoading = true;
      this.dialogRef.close();
    } else {
      console.log('Result: ', result);
      this.isLoading = true;
      this.toastrService.danger('Image uploading failed. Try again.');
    }
  }

}
