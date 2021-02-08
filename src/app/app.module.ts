import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from './ui-kit/toastr/toastr.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.socket.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LocalStorageModule.forRoot({
      prefix: environment.localStorage.prefix,
      storageType: 'localStorage'
    }),

    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgbModule,
    ScrollToModule.forRoot(),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor}
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
