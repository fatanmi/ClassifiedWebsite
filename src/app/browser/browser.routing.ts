import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';



export const BrowserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home',
          urls: [
            { title: 'Home', url: '/home' },
            { title: 'Home' }
          ]
        }
      }
    ]
  },

  {
    path: 'business-profile',
    children: [
      {
        path: '',
        component: BusinessProfileComponent,
        data: {
          title: 'Shop Info',
          urls: [
            { title: 'Shop Info', url: '/business-profile' }
          ]
        }
      }
    ]
  }
  ,

  {
    path: 'shop-info/:id',
    children: [
      {
        path: '',
        component: BusinessProfileComponent,
        data: {
          title: 'Shop Info',
          urls: [
            { title: 'Shop Info', url: '/shop-info' }
          ]
        }
      }
    ]
  }
];
