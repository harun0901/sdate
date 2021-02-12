import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from '../../../core/services/image.service';

@Component({
  selector: 'sdate-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private imageService: ImageService) { }

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
  }

  uploadImg(): void {
    this.imageService.uploadImage(this.croppedImage).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
