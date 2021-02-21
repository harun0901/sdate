import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { DashUserRoutingModule } from './dash-user-routing.module';
import { DashUserComponent } from './dash-user.component';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { IconModule } from '../../ui-kit/icon/icon.module';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [DashUserComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    DashUserRoutingModule,
    CommonUiKitModule,
    IconModule,
    MatFormFieldModule,
  ],
})
export class DashUserModule { }
