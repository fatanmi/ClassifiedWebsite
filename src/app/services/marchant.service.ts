import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Settings } from 'src/app/settings';
import { Market } from 'src/app/models/market';
import { BusinessCategory } from 'src/app/models/business-category';
import { Business } from 'src/app/models/business';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  
  token : string = localStorage.getItem('access_token');
  httpOptions = {
  
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    
  };

  constructor(private http: HttpClient) { }
  
  // Get all market locatiins
  getAllMarkets (): Observable<Market[]> { 
    return this.http.get<Market[]>(Settings._url+"/markets", this.httpOptions); 
  }
  
  // Get all Business Categories
  getAllBusinessCategories (): Observable<BusinessCategory[]> { 
    return this.http.get<BusinessCategory[]>(Settings._url +'/businesses/categories/all', this.httpOptions); 
  }
  
  // Get all businesses
  getAllBusinesses ( page: number, size: number): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings._url +'/businesses/all?page='+page+'&size='+size, this.httpOptions); 
  }
  
  // Get businesseses by category
  getBusinessesByCategory (category: string, page: number, size: number): Observable<Business[]> { 
    console.log("This the real deal "+ category);
    return this.http.get<Business[]>(Settings._url+'/businesses?category='+category+'&page='+page+'&size='+size, this.httpOptions); 
  }
  // Get businesses in a marketplace
  getBusinessesInAMarket (marketCode: string,page: number, size: number): Observable<Business[]> { 
    console.log("This the real deal "+ marketCode);
    return this.http.get<Business[]>(Settings._url +'/businesses/'+marketCode+'?page='+page+'&size='+size, this.httpOptions); 
  }
  // Get businesses in a marketplace by searchKey
  getBusinessesInAMarketBySearchKey (searchKey: string,page: number, size: number): Observable<Business[]> { 
    console.log("This the real deal "+ searchKey);
    return this.http.get<Business[]>(Settings._url +`/businesses/search?anytext=${searchKey}&page=${page}&size=${size}`, this.httpOptions); 
  }
  
  // Get all merchant businesses by id
  getMerchantBusinesses (merchantId: number): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings._url +'/businesses', this.httpOptions); 
  }
  
  // Get all businesses by merchant phone 
  getBusinessesByPhone (phoneNumber: string): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings._url +`/merchants/more-details/${phoneNumber}`, this.httpOptions); 
  }
  // Get all businesses by merchant Id 
  getBusinessesById (id: string): Observable<Business[]> { 
    console.log(id);
    return this.http.get<Business[]>(Settings._url +`/businesses/id?merchantId=${id}`, this.httpOptions); 
  }
  // Get all businesses by product tag 
  getBusinessesByProductTag (tag: string): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings._url +'/businesses', this.httpOptions); 
  }
  // Get business payment method
  getBusinessesPayMethod (): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings._url +'/payment_methods', this.httpOptions); 
  }
  // Get business payment method
  updateBusiness (businessInfo: any) { 
    return this.http.put(Settings._url +`/businesses`, businessInfo, this.httpOptions); 
  }
  
}
