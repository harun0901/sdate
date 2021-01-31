import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPipe } from './color.pipe';
import { AgePipe } from './age.pipe';

@NgModule({
  declarations: [
    ColorPipe,
    AgePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorPipe,
    AgePipe,
  ]
})
export class PipesModule { }
