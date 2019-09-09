import { Component, OnInit } from '@angular/core';
import {MerchantService} from '../../services/marchant.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  personalProfileForm = true;
  businessProfileForm = false;
  bioDataForm: FormGroup;
  businessDataForm: FormGroup;
  allState: any;
  stateCities: any;
  businessCategories: any;
  productCategories: any;
  paymentMethods: any;
  bioDataObj: any;
  businessTypeIdListArr: any[] = [];
  productCategoriesArr: any[] = [];
  paymentMethodIdListArr: any[] = [];


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
    this.initBioDataForm();
    this.initBusinessDataForm();
  }

  createMerchant() {
    const payload = this.buildCreateMerchantPayload();
    this.merchantService.postMerchantDetails(payload).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }


  initBioDataForm() {
    this.bioDataForm = this.fb.group({
      title: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  initBusinessDataForm() {
    this.businessDataForm = this.fb.group({
      name: [null, [Validators.required]],
      businessTypeIdList: [null, [Validators.required]],
      productCategories: [null, [Validators.required]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      market: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      paymentMethodIdList: [null, [Validators.required]],
      email: [null, [Validators.required]],
      activeDays: [null, [Validators.required]],
      closingHours: [null, [Validators.required]],
      openingHour: [null, [Validators.required]],
      shopNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      whatsappNumber: [null, [Validators.required]],
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
    this.businessTypeIdListArr.push(e.target.value);
    console.log('onChangeBusinessCat', this.businessCategories );
    const h = this.businessCategories.filter(m => m.id === parseInt(e.target.value, 10));
    this.productCategories = h[0].productCategories;
    console.log('onChangeBusinessCat', h );
  }
  onProductCategories(e: any) {
    this.productCategoriesArr.push(e.target.value);
    console.log('onProductCategories', e.target.value );

  }
  onPaymentMethod(e: any) {
    this.paymentMethodIdListArr.push(e.target.value);
    console.log('onPaymentMethod', e.target.value );

  }

  submitBioData() {
    if (this.bioDataForm.valid) {
      this.toggleFormView();
      this.bioDataObj = this.bioDataForm.value;
      console.log('submitBioData', this.bioDataObj);
    }
  }

  resetBioDataForm() {
    this.bioDataForm.reset();
  }

  onGetPaymentMethods() {
    this.merchantService.getPaymentMethods().subscribe(
      (res) => {
        console.log('onGetPaymentMethods', res);
        this.paymentMethods = res.data;
      }, (error) => {
        console.log('onGetPaymentMethods error', error);
      }
    );
  }

  buildCreateMerchantPayload() {
    return {
      businesses: [
        {
          // activeDays: 'string',
          // address: 'string',
          // closingHour: 'string',
          // description: 'string',
          // email: 'samdeniyie@yopmail.com',
          // market: 'string',
          // merchantId: 0,
          // name: 'string',
          // openingHour: 'string',
          // phoneNumber: '08030600903',
          // shopNumber: 'string',
          // state: 'string',
          // website: 'string',
          // whatsappNumber: 'string'
          ...this.businessDataForm.value,
          businessTypeIdList: this.businessTypeIdListArr,
          paymentMethodIdList: this.paymentMethodIdListArr,
          productCategories: this.productCategoriesArr
        }
      ],
      username: this.businessDataForm.value.phoneNumber,
      ... this.bioDataForm.value
    };
  }
}
