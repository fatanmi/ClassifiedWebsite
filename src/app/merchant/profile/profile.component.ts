import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/marchant.service';
import { Merchant } from 'src/app/models/merchant';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private merchantService: MerchantService,
    private toastr: ToastrService,
    private router : Router,
    private fb: FormBuilder

  ) { }
  
  lat = 3.4241753;
  lng = 6.4255113;
  merchantProfile : any = {
    businesses: {}
  };
  dropdownSettings: any;
  dropdownSettingsProduct:any;
  businessCategories :any;
  bizCat : any =[] ;
  payMode : any =[] ;
  ProductLists: any;
  paymentMethods: any;
  listOfProducts: any = [];
  selectedImage: File ;
  file;
  form = this.fb.group({
    file: [null, Validators.required]
  });

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
  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
  uploadImage(event) {
    console.log(event.target.files[0]);
    this.selectedImage = event.target.files[0] ;
    //delete this.merchantProfile.businesses;
    this.merchantProfile.merchantId = this.merchantProfile.id;
    
    //delete merchantProfileJsonString.businesses ;
    
    this.merchantService.uploadImage(this.selectedImage,this.merchantProfile).subscribe(
      (Response: any)=>{
        console.log(Response);
      },
      (error : any)=>{
        console.log(error);
      }
    )
  }
  getAllCategories() {
    this.merchantService.getAllBusinessCategories().subscribe(
      (Response: any)=>{
        console.log(Response);
        this.businessCategories = Response.data;
        
        console.log(this.businessCategories);
        console.log(this.bizCat);
      },
      (error : any)=>{
        console.log(error);
      }
    )
  }
  getBusinessPayMethods(){
    this.merchantService.getBusinessesPayMethod().subscribe(
      (Response: any)=>{
        this.paymentMethods = Response.data;
        this.paymentMethods.map((payMethod, index) => {
          const row = {
            id: index + 1 ,
            name:payMethod.paymentMode 
          };
          this.payMode = [...this.payMode,row]
        });
        console.log(this.paymentMethods);
      },
      (error : any)=>{
        console.log(error);
      }
    )
  }
  fillProductLists(){ 
  }
  editMerchantProfile (){
    this.merchantProfile.businesses.name = this.merchantProfile.businesses.businessName;
    this.merchantProfile.businesses.businessTypeIdList = this.merchantProfile.businesses.businessTypeNames.map(
      buinessCategories => buinessCategories.id
    ).filter(catNumber => catNumber !== undefined );
    this.merchantProfile.businesses.paymentMethodIdList = this.merchantProfile.businesses.paymentMethodNames.map(
      buinessPayMode => buinessPayMode.id
    ).filter(ModeNumber => ModeNumber !== undefined );

    this.merchantService.updateBusiness(this.merchantProfile.businesses).subscribe(
      (response: any)=>{
        this.toastr.success('Success', 'Profile Updated successfull')
        console.log(response);
      },
      (error: any)=>{
        console.log(error);
      }
    )
  }
  getCategoryProducts(productId) {
    this.businessCategories[productId].productCategories;
  }
  onCategoryItemSelect(data) {
    let catProduct ;
    catProduct = this.businessCategories[data.id].productCategories;

    this.listOfProducts = catProduct;
    console.log(this.listOfProducts);
  }
  ngOnInit() {
    this.getAllCategories();
    this.getBusinessInfo();
    this.getBusinessPayMethods();
    
    this.dropdownSettingsProduct = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

}
