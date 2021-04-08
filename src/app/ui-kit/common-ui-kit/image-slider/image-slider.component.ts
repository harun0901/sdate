import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { ImageSlider } from '../../../core/models/upload';

@Component({
  selector: 'sdate-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  images: string[] = [];

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      hideOnClick: false,
    },
    threshold: 50,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataInfo: ImageSlider,
  ) { }

  ngOnInit(): void {
    console.log(this.dataInfo);
    this.images = this.dataInfo.images.map((item) => item);
  }

}
