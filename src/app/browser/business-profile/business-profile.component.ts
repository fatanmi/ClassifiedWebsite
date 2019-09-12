import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/services/marchant.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  lng = 3.4241753;
  lat = 6.4255113;
  businessId: string;
  businessDetails: any = {};
  merchantProfile: any = {};
  loggedIn : any ;
  emptyArray: any = [];
  bussinesses : any = []
  fault : string;
  searchKey : string;
  selectedCategory: any;
  page = 1;
  size = 10;
  selectedMarket: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private merchantService: MerchantService,
    private router: Router,
    private authService : AuthService
    ) { }
    getBusinessDetails() {
      this.merchantService.getBusinessesById(this.businessId).subscribe(
        (response: any)=>{
          console.log(response);
          this.businessDetails = response ? response.data[0] : this.businessDetails;
          console.log(this.businessDetails);
        },
        (error: any)=>{
          console.log(error);
        }
        )
      }
      logOut() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/']);
      }
      getLoggedInStatus(){
        this.loggedIn = this.authService.isAuthenticated();
      }
      getBusinessInfo() {
        let phoneNumber =  localStorage.getItem('username');
        this.merchantService.getBusinessesByPhone(phoneNumber).subscribe(
          (response:any)=>{
            this.merchantProfile = response.data;
            this.merchantProfile.businesses = response.data.businesses[0];
            this.getAllBusinessesByMarket();
            console.log(response);
          },
          (error:any)=>{
            console.log(error);
          }
          );
        }
        getAllBusinessesByMarket() {
          console.log(this.merchantProfile);
          this.merchantService.getBusinessesInAMarket(this.merchantProfile.businesses.market,1, 8)
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
          doDeepSearch() {
            this.merchantService.getBusinessesByDeepSearchKey(this.searchKey,this.selectedCategory.id || 0,this.selectedMarket.marketName, this.page, this.size)
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
            this._Activatedroute.params.subscribe((params) => {
              this.businessId = params['id'];
            });
            this.getBusinessInfo();
            this.getLoggedInStatus();
            this.getBusinessDetails();
          }
  }
        