import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NpnSliderModule } from 'npn-slider';
import { A11yModule } from '@angular/cdk/a11y';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DashUserRoutingModule } from './dash-user-routing.module';
import { DashUserComponent } from './dash-user.component';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { IconModule } from '../../ui-kit/icon/icon.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { CategoryComponent } from './category/category.component';
import { AvatarModule } from '../../ui-kit/avatar/avatar.module';


@NgModule({
  declarations: [DashUserComponent, UserDetailComponent, PasswordUpdateComponent, CategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NpnSliderModule,
    A11yModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    DashUserRoutingModule,
    CommonUiKitModule,
    IconModule,
    MatListModule,
    AvatarModule,
  ],
})
export class DashUserModule { }
