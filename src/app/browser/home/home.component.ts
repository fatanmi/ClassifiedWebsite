import { Component, OnInit } from '@angular/core';

import { Market } from 'src/app/models/market';
import { HttpResp} from 'src/app/models/http-resp'
import { BusinessCategory } from 'src/app/models/business-category';
import { Business } from 'src/app/models/business';
import { MerchantService } from 'src/app/services/marchant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  markets: Market[];
  resp: any;
  title: String;
  fault: String;
  categories: BusinessCategory[];
  bussinesses: Business[];

  selectedMarket: string = '';
  selectedCategory: string = '';
  isLoading: boolean = false;

  //event handler for the select element's change event
  selectMarketHandler ($event, selectedMarket) {
   
    this.selectedMarket = $event.marketName;

    if(this.selectedMarket == "All Markets")
    {
      this.selectedMarket = "";
    }


    console.log(this.selectedMarket);
    this.getAllBusinessesByMarket(this.selectedMarket,1,15000);
  }

  //event handler for the select element's change event
  selectCategoryHandler ($event) {
    
    this.selectedCategory = $event.name;

    if(this.selectedCategory == "All Categories")
    {
      this.selectedCategory = "";
    }

    this.getAllBusinessesByCategory(this.selectedCategory,1,1500);
  }

  constructor(private marketService: MerchantService, 
    private spinnerService: Ng4LoadingSpinnerService ) { } 

  ngOnInit() {
    this.getMarkets();
    this.getCategories();
    this.getAllBusinesses(1,500);
    
  }

  showLoader()
  {
    this.spinnerService.show();
    this.isLoading = true;
    
  }

  hideLoader(){
   
    this.isLoading = false;
    setTimeout(()=>this.spinnerService.hide(),3000)
    
  }

  getMarkets() {

    this.marketService.getAllMarkets()
    .subscribe(resp => {

      console.log(resp);
      this.resp = resp;
      this.markets = this.resp.data;
      console.log(this.markets)
     
     },
     error => {
      this.fault = error ; // error path
      console.log(JSON.stringify(this.fault));
      
     }

    );
    
  }

  getCategories() {

    this.marketService.getAllBusinessCategories()
    .subscribe(resp => {

      console.log(resp);
      this.resp = resp;
      this.categories = this.resp.data;
      console.log(this.categories)
     
     },
     error => {
      this.fault = error ; // error path
      console.log(JSON.stringify(this.fault));
     }

    );
    

  }

  getAllBusinesses( page: number, size: number) {


    this.marketService.getAllBusinesses(page, size)
    .subscribe(resp => {

      this.hideLoader();
      console.log(resp);
      this.resp = resp;
      this.bussinesses = this.resp.data;
      console.log(this.bussinesses)
      
     
     },
     error => {
    
      this.fault = error ; // error path
      console.log(JSON.stringify(this.fault));
     
     }

    );
    

  }


  getAllBusinessesByCategory(category: string, page: number, size: number) {

    this.marketService.getBusinessesByCategory(category,page, size)
    .subscribe(resp => {

      console.log(resp);
      this.resp = resp;
      this.bussinesses = this.resp.data;
      console.log(this.bussinesses)
     
     },
     error => {
      this.fault = error ; // error path
      console.log(JSON.stringify(this.fault));
     }

    );

  }


  getAllBusinessesByMarket(market: string, page: number, size: number) {

    this.marketService.getBusinessesInAMarket(market,page, size)
    .subscribe(resp => {

      console.log(resp);
      this.resp = resp;
      this.bussinesses = this.resp.data;
      
     
     },
     error => {
      this.fault = error ; // error path
      console.log(JSON.stringify(this.fault));
     }

    );

  }


}
