import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { DashLanguageRoutingModule } from './dash-language-routing.module';
import { DashLanguageComponent } from './dash-language.component';
import { DashWordComponent } from './dash-word/dash-word.component';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';


@NgModule({
  declarations: [DashLanguageComponent, DashWordComponent],
  imports: [
    CommonModule,
    DashLanguageRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    CommonUiKitModule,
  ],
})
export class DashLanguageModule { }
