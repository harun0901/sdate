import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GiftPanelComponent } from './gift-panel/gift-panel.component';
import { GiftChatComponent } from './gift-chat/gift-chat.component';
import { IconModule } from '../../ui-kit/icon/icon.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [GiftPanelComponent, GiftChatComponent],
  exports: [
    GiftPanelComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class GiftModule { }
