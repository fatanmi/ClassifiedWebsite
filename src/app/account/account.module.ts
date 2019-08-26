import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routing';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes)
  ]
})
export class AccountModule { }
