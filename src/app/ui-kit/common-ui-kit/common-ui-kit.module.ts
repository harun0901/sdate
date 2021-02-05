import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../pipes/pipes.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { ImageRendererComponent } from './image-renderer/image-renderer.component';
import { ActionDropdownComponent } from './action-dropdown/action-dropdown.component';
import { CheckMarkCircleComponent } from './check-mark-circle/check-mark-circle.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    CheckMarkCircleComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NgbDropdownModule,
    IconModule,
    PipesModule
  ],
  exports: [
    SpinnerComponent,
    ImageRendererComponent,
    ActionDropdownComponent,
    CheckMarkCircleComponent
  ]
})
export class CommonUiKitModule {
}
