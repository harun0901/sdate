import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { SupportRoutingModule } from './support-routing.module';
import { FaqComponent } from './faq/faq.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [FaqComponent, GuidelineComponent, ContactComponent],
  imports: [
    MatExpansionModule,
    CommonModule,
    SupportRoutingModule,
    MatTabsModule,
  ]
})
export class SupportModule { }
