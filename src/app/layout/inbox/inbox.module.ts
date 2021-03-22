import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxItemComponent } from './inbox-item/inbox-item.component';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { IconModule } from '../../ui-kit/icon/icon.module';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';


@NgModule({
  declarations: [InboxComponent, InboxItemComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    InboxRoutingModule,
    PipesModule,
    IconModule,
    CommonUiKitModule,
  ],
})
export class InboxModule { }
