import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';




export const AccountRoutes: Routes = [
  
  {
    path: 'register',
    children: [
      {
        path: '',
        component: RegisterComponent,
        data: {
          title: 'Register',
          urls: [
            { title: 'Register', url: '/register' },
            { title: 'Register' }
          ]
        }
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          title: 'Login',
          urls: [
            { title: 'Login', url: '/login' },
            { title: 'Login' }
          ]
        }
      }
    ]
  },

];
