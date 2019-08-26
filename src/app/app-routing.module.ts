import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './layouts/layout1/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/layout2/main-layout/main-layout.component';



export const routes: Routes = [
  {
    path: '',
    // component: BlankLayoutComponent,
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
      },
      {
        path: '',
        redirectTo: '/browser/home',
        pathMatch: 'full'

      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/browser/home', pathMatch: 'full' },
     
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