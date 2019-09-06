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
  merchantProfile : any = {
    businesses: {}
  };
  dropdownSettings: any;
  businessCategories :any;
  ProductLists: any;
  paymentMethods: any;

  getBusinessInfo() {
    let phoneNumber =  localStorage.getItem('username');
    this.merchantService.getBusinessesByPhone(phoneNumber).subscribe(
      (response:any)=>{
        this.merchantProfile = response.data;
        this.merchantProfile.businesses = response.data.businesses[0];

        console.log(response);
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  getAllCategories() {
    this.merchantService.getAllBusinessCategories().subscribe(
      (Response: any)=>{
        this.businessCategories = Response.data.map((category)=> {return category.name} );
        console.log(this.businessCategories);
      },
      (error : any)=>{
        console.log(error);
      }
    )
  }
  getBusinessPayMethods(){
    this.merchantService.getBusinessesPayMethod().subscribe(
      (Response: any)=>{
        this.paymentMethods = Response.data.map((paymode)=> {return paymode.paymentMode} );
        console.log(this.paymentMethods);
      },
      (error : any)=>{
        console.log(error);
      }
    )
  }
  fillProductLists(){

  }
  ngOnInit() {
    this.getAllCategories();
    this.getBusinessInfo();
    this.getBusinessPayMethods();
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

}
