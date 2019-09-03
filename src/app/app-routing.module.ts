import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './layouts/layout1/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/layout2/main-layout/main-layout.component';
import {AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [

      {
        path: 'browser',
        loadChildren:
          './browser/browser.module#BrowserModule'
      },
      {
        path: 'account',
        loadChildren:
          './account/account.module#AccountModule'
      }
      ,
      {
        path: 'login',
        loadChildren:
          './account/account.module#AccountModule'
      }
      ,
      {
        path: '',
        redirectTo: '/browser',
        pathMatch: 'full'

      }
    ]
  },
  {
    path: '',
    //component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'merchant',
        loadChildren:
          './merchant/merchant.module#MerchantModule'
      },
      { 
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full' 
      }
     
    ]
  },
  {
    path: '**',
    loadChildren:
          './browser/browser.module#BrowserModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }