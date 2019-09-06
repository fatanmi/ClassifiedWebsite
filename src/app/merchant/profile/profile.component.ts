import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/marchant.service';
import { Merchant } from 'src/app/models/merchant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private merchantService: MerchantService
  ) { }

  lat = 3.4241753;
  lng = 6.4255113;
  merchantProfile : any;
  firstName : string;
  
  getBusinessInfo() {
    let phoneNumber =  localStorage.getItem('username');
    this.merchantService.getBusinessesByPhone(phoneNumber).subscribe(
      (response:any)=>{
        this.merchantProfile = response.data;
        this.firstName = response.data.firstName;
        console.log(response);
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getBusinessInfo();
  }

}
