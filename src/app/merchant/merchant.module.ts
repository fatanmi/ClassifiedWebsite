import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MerchantRoutes } from './merchant.routing';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCFoqnJWu6UAchNsRTfaQ_E1JCAqVc8Stk',
      libraries:['places']
    }),
    RouterModule.forChild(MerchantRoutes),
  ]
})
export class MerchantModule { }
