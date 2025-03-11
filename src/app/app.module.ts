import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpinterceptorsService } from "./client-app/client-shared/interceptors/httpinterceptors.service";
import { HttpinterceptorsadminService } from '../app/admin/admin-shared/interceptors/httpinterceptors.service';
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { AdminModule } from './admin/admin.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
  ],
  providers: [
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HttpinterceptorsService,
    //     multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorsadminService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
