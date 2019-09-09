import { Component, OnInit } from '@angular/core';
import {MerchantService} from '../../services/marchant.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dropdownSettings: any;
  personalProfileForm = true;
  businessProfileForm = false;
  bioDataForm: FormGroup;
  businessDataForm: FormGroup;
  allState: any;
  stateCities: any;
  businessCategories: any;
  businessCategories2: any;
  productCategories: any;
  paymentMethods: any;
  bioDataObj: any;
  businessTypeIdListArr: any[] = [];
  productCategoriesArr: any[] = [];
  paymentMethodIdListArr: any[] = [];


  constructor(private merchantService: MerchantService, private fb: FormBuilder, private toastr: ToastrService,
              private router: Router) {

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

  createMerchant() {
    const payload = this.buildCreateMerchantPayload();
    this.merchantService.postMerchantDetails(payload).subscribe(
      (res) => {
        console.log('createMerchant', res);
        this.toastr.success(res.message, 'SUCCESS!!!');
        this.router.navigate(['/login']);
      }
    );
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
        this.businessCategories2 = res.data.map(category => category.name );
        console.log('businessCategories2', this.businessCategories2);
        console.log('businessCategories', this.businessCategories);
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
