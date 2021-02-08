import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPipe } from './color.pipe';
import { AgePipe } from './age.pipe';
import { IsMinePipe } from './is-mine.pipe';

@NgModule({
  declarations: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
  ]
})
export class PipesModule { }
