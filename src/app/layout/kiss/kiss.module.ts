import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KissChatComponent } from './kiss-chat/kiss-chat.component';
import { IconModule } from '../../ui-kit/icon/icon.module';

@NgModule({
  declarations: [KissChatComponent],
  exports: [
    KissChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
  ],
})
export class KissModule { }
