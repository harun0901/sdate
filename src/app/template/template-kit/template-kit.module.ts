import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule } from '../../ui-kit/icon/icon.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AvatarModule } from '../../ui-kit/avatar/avatar.module';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { DashFooterComponent } from './dash-footer/dash-footer.component';

@NgModule({
  declarations: [
    SidebarComponent,
    DashHeaderComponent,
    DashFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IconModule,
    NgbDropdownModule,
    PipesModule,
    CommonUiKitModule,
    AvatarModule
  ],
  exports: [
    SidebarComponent,
    DashHeaderComponent,
    DashFooterComponent,
  ],
})
export class TemplateKitModule {
}
