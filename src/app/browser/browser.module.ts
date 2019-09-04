import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserRoutes } from './browser.routing';
import { FormsModule } from '@angular/forms';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { MainSiteFooterComponent } from '../shared/main-site-footer/main-site-footer.component';

@NgModule({
  declarations: [HomeComponent, BusinessProfileComponent,MainSiteFooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BrowserRoutes),
    FormsModule 
  ]
})
export class BrowserModule { }
