import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatDialogModule } from '@angular/material/dialog';
import { SwiperModule as NgxSwiperModule } from 'ngx-swiper-wrapper';

import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../pipes/pipes.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImageRendererComponent } from './image-renderer/image-renderer.component';
import { ActionDropdownComponent } from './action-dropdown/action-dropdown.component';
import { CheckMarkCircleComponent } from './check-mark-circle/check-mark-circle.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectComponent } from './select/select.component';
import { DashTotalComponent } from './dash-total/dash-total.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    CheckMarkCircleComponent,
    ImageCropperComponent,
    TextInputComponent,
    SelectComponent,
    DashTotalComponent,
    ImageSliderComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgbDropdownModule,
    IconModule,
    PipesModule,
    ImageCropperModule,
    FormsModule,
    MatDialogModule,
    NgxSwiperModule,
  ],
  exports: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    CheckMarkCircleComponent,
    ImageCropperComponent,
    TextInputComponent,
    SelectComponent,
    DashTotalComponent,
    ImageSliderComponent,
  ],
})
export class CommonUiKitModule {
}
