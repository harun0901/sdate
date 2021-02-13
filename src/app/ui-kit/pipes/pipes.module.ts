import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPipe } from './color.pipe';
import { AgePipe } from './age.pipe';
import { IsMinePipe } from './is-mine.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
    TimeAgoPipe,
  ]
})
export class PipesModule { }
