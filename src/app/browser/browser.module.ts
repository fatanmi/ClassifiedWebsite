import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserRoutes } from './browser.routing';
import { FormsModule } from '@angular/forms';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { MainSiteFooterComponent } from '../shared/main-site-footer/main-site-footer.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [HomeComponent, BusinessProfileComponent,MainSiteFooterComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCFoqnJWu6UAchNsRTfaQ_E1JCAqVc8Stk',
      libraries:['places']
    }),
    RouterModule.forChild(BrowserRoutes),
    FormsModule 
  ]
})
export class BrowserModule { }
