import { Component, OnInit } from '@angular/core';
import {MerchantService} from '../../services/marchant.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  personalProfileForm = true;
  businessProfileForm = false;
  bioDataForm: FormGroup;
  allState: any;
  stateCities: any;
  businessCategories: any;
  productCategories: any;
  paymentMethods: any;

  constructor(private merchantService: MerchantService, private fb: FormBuilder) {

    this.personalProfileForm = true;
    this.businessProfileForm = false;

   }



  toggleFormView() {
    this.personalProfileForm = !this.personalProfileForm;
    this.businessProfileForm = !this.businessProfileForm;
  }

  ngOnInit() {

    this.personalProfileForm = true;
    this.businessProfileForm = false;
    this.getNigerianState();
    this.getAllBizCat();
    this.onGetPaymentMethods();
  }

  createMerchant() {
    const payload = {
      businesses: [
      {
        activeDays: 'string',
        address: 'string',
        businessTypeIdList: [
          1, 2
        ],
        closingHour: 'string',
        description: 'string',
        email: 'samdeniyie@yopmail.com',
        market: 'string',
        merchantId: 0,
        name: 'string',
        openingHour: 'string',
        paymentMethodIdList: [
          1, 2
        ],
        phoneNumber: '08030600903',
        productCategories: [
          'string'
        ],
        shopNumber: 'string',
        state: 'string',
        website: 'string',
        whatsappNumber: 'string'
      }
    ],
      confirmPassword: '1q2w3e4r5t6y',
      dateOfBirth: 'string',
      email: 'samdeniyie@yopmail.com',
      firstName: 'string',
      lastName: 'string',
      password: '1q2w3e4r5t6y',
      phoneNumber: '08030600903',
      title: 'string',
      username: '08030600903'
    };

    this.merchantService.postMerchantDetails(payload).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }


  initBioDataForm() {
    this.bioDataForm = this.fb.group({

    });
  }

  getNigerianState() {
    this.merchantService.getAllStates().subscribe((res) => {
      this.allState = res;
    });
  }
  getCitiesInState(e: any) {
      console.log('getCitiesInState', e.target.value);
      this.merchantService.getCities(e.target.value).subscribe(
        (res) => {
          if (res.status !== 404) {
            this.stateCities = res;
          } else {
            this.getStateCapital(e.target.value);
          }
          console.log('getCitiesInState', res);
        }
      );
  }
  getStateCapital(e: any) {
    this.merchantService.getStateCapital(e).subscribe(
      (res) => {
        this.stateCities = [res];
      }
    );
  }

  getAllBizCat() {
    this.merchantService.getBusinessCategories().subscribe(
      (res) => {
        this.businessCategories = res.data;
        console.log('getAllBizCat', this.businessCategories);
      }
    );
  }

  onChangeBusinessCat(e: any) {
    console.log('onChangeBusinessCat', e.target.value );
    console.log('onChangeBusinessCat', this.businessCategories );
    const h = this.businessCategories.filter(m => m.id === parseInt(e.target.value, 10));
    this.productCategories = h[0].productCategories;
    console.log('onChangeBusinessCat', h );
  }

  onGetPaymentMethods() {
    this.merchantService.getPaymentMethods().subscribe(
      (res) => {
        console.log('onGetPaymentMethods', res);
        this.paymentMethods = res.data;
      }
    );
  }

}
