import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MerchantRoutes } from './merchant.routing';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCFoqnJWu6UAchNsRTfaQ_E1JCAqVc8Stk',
      libraries:['places']
    }),
    RouterModule.forChild(MerchantRoutes),
  ]
})
export class MerchantModule { }
