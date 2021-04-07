import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPipe } from './color.pipe';
import { AgePipe } from './age.pipe';
import { IsMinePipe } from './is-mine.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { RouteToAbsolutePipe } from './route-to-absolute.pipe';

@NgModule({
  declarations: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
    TimeAgoPipe,
    RouteToAbsolutePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorPipe,
    AgePipe,
    IsMinePipe,
    TimeAgoPipe,
    RouteToAbsolutePipe,
  ]
})
export class PipesModule { }
