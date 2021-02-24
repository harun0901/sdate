import { Component, Inject, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageSlider } from '../../../core/models/upload';

@Component({
  selector: 'sdate-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  slides: ((image) => string)[][];
  constructor(
    // @Inject(MAT_DIALOG_DATA) public dataInfo: ImageSlider,
  ) { }

  ngOnInit(): void {
    // console.log(this.dataInfo);
    // this.slides = this.dataInfo.images.map((item) => [image => item]);
  }

}
