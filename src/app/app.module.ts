import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BlankLayoutComponent } from './layouts/layout1/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/layout2/main-layout/main-layout.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './services/loader.service';
import { AgmCoreModule } from '@agm/core';
import { MerchantModule } from "../app/merchant/merchant.module";
//import { MainSiteFooterComponent } from './shared/main-site-footer/main-site-footer.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
 
    SpinnerComponent,
 
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    Ng4LoadingSpinnerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['merchant-service.test.rensource.energy/','52.28.189.80:8284'],
        blacklistedRoutes: [],
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    })
  ],
  
  providers: [
    AuthService,
    AuthGuardService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
