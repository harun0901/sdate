import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [IconComponent],
  exports: [
    IconComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
})
export class IconModule { }
