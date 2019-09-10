import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/services/marchant.service';
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

  constructor(
    private _Activatedroute: ActivatedRoute,
    private merchantService: MerchantService,
    private router: Router
  ) { }
  getBusinessDetails() {
    this.merchantService.getBusinessesById(this.businessId).subscribe(
        (response: any)=>{
          this.businessDetails = response.data[0];
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
  ngOnInit() {
    this._Activatedroute.params.subscribe((params) => {
      this.businessId = params['id'];
    });
    this.getBusinessDetails();
  }
}
