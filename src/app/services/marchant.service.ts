import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Settings } from 'src/app/settings';
import { Market } from 'src/app/models/market';
import { BusinessCategory } from 'src/app/models/business-category';
import { Business } from 'src/app/models/business';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

};

@Injectable({
  providedIn: 'root'
})
export class MerchantService {


  constructor(private http: HttpClient) { }

  // Get all market locatiins
  getAllMarkets (): Observable<Market[]> {
    return this.http.get<Market[]>(Settings._url+"/markets", httpOptions);
  }

  // Get all Business Categories
  getAllBusinessCategories (): Observable<BusinessCategory[]> {
    return this.http.get<BusinessCategory[]>(Settings._url +'/businesses/categories/all', httpOptions);
  }

   // Get all businesses
   getAllBusinesses ( page: number, size: number): Observable<Business[]> {
    return this.http.get<Business[]>(Settings._url +'/businesses/all?page='+page+'&size='+size, httpOptions);
  }

   // Get businesseses by category
   getBusinessesByCategory (category: string, page: number, size: number): Observable<Business[]> {
    console.log("This the real deal "+ category);
    return this.http.get<Business[]>(Settings._url+'/businesses?category='+category+'&page='+page+'&size='+size, httpOptions);
  }

    // Get businesses in a marketplace
    getBusinessesInAMarket (marketCode: string,page: number, size: number): Observable<Business[]> {
      console.log("This the real deal "+ marketCode);
      return this.http.get<Business[]>(Settings._url +'/businesses/'+marketCode+'?page='+page+'&size='+size, httpOptions);
    }

    // Get all merchant businesses by id
    getMerchantBusinesses(merchantId: number): Observable<Business[]> {
      return this.http.get<Business[]>(Settings._url +'/businesses', httpOptions);
    }

    // Get all businesses by merchant phone
    getBusinessesByPhone(phoneNumber: string): Observable<Business[]> {
      return this.http.get<Business[]>(Settings._url + `/merchants/${phoneNumber}`, httpOptions);
    }
    // Get all businesses by merchant phone
    // getBusinessesByPhone (phoneNumber: string): Observable<Business[]> {
    //   return this.http.get<Business[]>(Settings._url +`/merchants/more-details/${phoneNumber}`, httpOptions);
    // }

    // Get all businesses by merchant Id
    getBusinessesById(id: string): Observable<Business[]> {
      console.log(id);
      return this.http.get<Business[]>(Settings._url +`/businesses/id?merchantId=${id}`, httpOptions);
    }

    // Get all businesses by product tag
    getBusinessesByProductTag(tag: string): Observable<Business[]> {
      return this.http.get<Business[]>(Settings._url +'/businesses', httpOptions);
    }

    postMerchantDetails(payload: any): Observable<any> {
     return this.http.post('https://merchant-service.test.rensource.energy/api/auth/v1/onboarding/merchants', payload);
    }

    getAllStates(): Observable<any>{
      return this.http.get('http://locationsng-api.herokuapp.com/api/v1/states');
    }

    getCities(stateName): Observable<any> {
      return this.http.get(`http://locationsng-api.herokuapp.com/api/v1/states/${stateName}/cities`);
    }
    getStateCapital(stateName): Observable<any> {
      // return this.http.get(`http://locationsng-api.herokuapp.com/api/v1/states/${stateName}/cities`);
      return this.http.get(`http://locationsng-api.herokuapp.com/api/v1/states/${stateName}/capital`);
    }

    getBusinessCategories(): Observable<any> {
     return this.http.get(Settings._url + '/businesses/categories/all');
    }
    getPaymentMethods(): Observable<any> {
     return this.http.get(Settings._url + '/payment_methods');
    }
    // Get business payment method
    getBusinessesPayMethod(): Observable<Business[]> {
      return this.http.get<Business[]>(Settings._url +'/payment_methods', httpOptions);
    }

}
