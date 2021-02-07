import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from './ui-kit/toastr/toastr.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LocalStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgbModule,
    ScrollToModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor}
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
