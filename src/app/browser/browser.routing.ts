import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';



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
  }
];
