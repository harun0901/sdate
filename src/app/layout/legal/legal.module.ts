import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [ImprintComponent, PrivacyComponent, TermsComponent],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }
