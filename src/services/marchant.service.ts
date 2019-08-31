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
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4040',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST',
    'Access-Control-Allow-Headers': 'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma'
  })

};

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private _url = Settings.base_url + 'api/v1/markets';

  constructor(private http: HttpClient) { }

  // Get all market locatiins
  getAllMarkets (): Observable<Market[]> { 
    return this.http.get<Market[]>(Settings.base_url +'api/v1/markets', httpOptions); 
  }

  // Get all Business Categories
  getAllBusinessCategories (): Observable<BusinessCategory[]> { 
    return this.http.get<BusinessCategory[]>(Settings.base_url +'api/v1/businesses/categories/all', httpOptions); 
  }

   // Get all businesses
   getAllBusinesses ( page: number, size: number): Observable<Business[]> { 
    return this.http.get<Business[]>(Settings.base_url +'api/v1/businesses/all?page='+page+'&size='+size, httpOptions); 
  }

   // Get businesseses by category
   getBusinessesByCategory (category: string, page: number, size: number): Observable<Business[]> { 
    console.log("This the real deal "+ category);
    return this.http.get<Business[]>(Settings.base_url+'api/v1/businesses?category='+category+'&page='+page+'&size='+size, httpOptions); 
  }

    // Get businesses in a marketplace
    getBusinessesInAMarket (marketCode: string,page: number, size: number): Observable<Business[]> { 
      console.log("This the real deal "+ marketCode);
      return this.http.get<Business[]>(Settings.base_url +'api/v1/businesses/'+marketCode+'?page='+page+'&size='+size, httpOptions); 
    }

    // Get all merchant businesses by id
    getMerchantBusinesses (merchantId: number): Observable<Business[]> { 
      return this.http.get<Business[]>(Settings.base_url +'api/v1/businesses', httpOptions); 
    }

    // Get all businesses by merchant phone 
    getBusinessesByPhone (businessName: string): Observable<Business[]> { 
      return this.http.get<Business[]>(Settings.base_url +'api/v1/businesses', httpOptions); 
    }

    // Get all businesses by merchant phone 
    getBusinessesByProductTag (tag: string): Observable<Business[]> { 
      return this.http.get<Business[]>(Settings.base_url +'api/v1/businesses', httpOptions); 
    }


}
