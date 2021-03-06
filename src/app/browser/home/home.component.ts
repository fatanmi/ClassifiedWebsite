import { Component, OnInit } from '@angular/core';
import { Market } from 'src/app/models/market';
import { HttpResp} from 'src/app/models/http-resp'
import { BusinessCategory } from 'src/app/models/business-category';
import { Business } from 'src/app/models/business';
import { MerchantService } from 'src/app/services/marchant.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  bussinesses: any;
  selectedMarket: any ;
  selectedCategory: any ;
  isLoading: boolean = false;
  searchKey:string =''; 
  page = 1;
  size = 10;
  emptyArray = []
  emptyObject = {};
  loggedIn : Boolean;
  
  constructor(
    private marketService: MerchantService, 
    private spinnerService: Ng4LoadingSpinnerService,
    private _Activatedroute : ActivatedRoute,
    private authService : AuthService
    ){ } 
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
      .subscribe(
        (response : any) => {
          console.log(response);
          this.bussinesses = response ? response.data : this.emptyArray ;
          console.log(this.bussinesses)
        },
        (error:any) => {
          console.log(error);
        }
        );
      }
      getLoggedInStatus(){
        this.loggedIn = this.authService.isAuthenticated();
      }
      getAllBusinessesByMarket(market: string, page: number, size: number) {
        this.marketService.getBusinessesInAMarket(market,page, size)
        .subscribe(
          (response :any) => {
            console.log(response);
            this.bussinesses = response ? response.data : this.emptyArray;
            console.log(this.bussinesses)
          },
          (error :any) => {
            this.fault = error ; // error path
            console.log(JSON.stringify(this.fault));
          }
      );
    }
    getAllBusinessesBySearchKey() {
      this.marketService.getBusinessesInAMarketBySearchKey(this.searchKey,this.page, this.size)
      .subscribe(
        (response : any) => {
          console.log(response);
          this.bussinesses = response ? response.data : this.emptyArray;
        },
        (error :any) => {
          this.fault = error ; // error path
          console.log(this.fault);
        }
        );
      }
      filterSearchForMarket() {
        if(this.searchKey.length < 1){
          this.getAllBusinessesByMarket(this.selectedMarket.marketName,1,20);
        }
        else {
          this.bussinesses = this.bussinesses.filter(business=> business.market === this.selectedMarket.marketName );
          
        }
        
      }
      filterSearchForCategories() {
        if(this.searchKey.length < 1){
          this.getAllBusinessesByCategory(this.selectedCategory.name,1,20);
        }else {
          this.bussinesses = this.bussinesses.filter(business=> business.businessTypeNames.include(this.selectedCategory) );
        }
        
      }
      doDeepSearch() {
        this.marketService.getBusinessesByDeepSearchKey(this.searchKey,this.selectedCategory.id || 0,this.selectedMarket.marketName, this.page, this.size)
        .subscribe(
          (response : any) => {
            console.log(response);
            this.bussinesses = response ? response.data : this.emptyArray;
          },
          (error :any) => {
            this.fault = error ; // error path
            console.log(this.fault);
          }
          );
        }
        ngOnInit() {
          this.getMarkets();
          this.getCategories();
          this.getAllBusinesses(1,12);
          this.getLoggedInStatus();
        }
            
     }
          