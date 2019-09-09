import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routing';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, VerifyComponent, PasswordRecoveryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(AccountRoutes)
  ]
})
export class AccountModule { }
