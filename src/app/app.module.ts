import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlankLayoutComponent } from './layouts/layout1/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/layout2/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
