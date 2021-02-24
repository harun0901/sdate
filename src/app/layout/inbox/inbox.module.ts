import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxItemComponent } from './inbox-item/inbox-item.component';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { IconModule } from '../../ui-kit/icon/icon.module';


@NgModule({
  declarations: [InboxComponent, InboxItemComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    PipesModule,
    IconModule,
  ],
})
export class InboxModule { }
