import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

export const MerchantRoutes: Routes = [

  {
    path: 'profile',
    children: [
      {
        path: '', 
        component: ProfileComponent,
        data: {
          title: 'Profile',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Profile' }
          ]
        }
      }
    ]
  }
  ,
      { 
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full' 
      }
];
