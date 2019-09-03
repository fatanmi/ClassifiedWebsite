import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserSession } from '../models/user-session';
import { Settings } from '../settings';
import { Login } from '../models/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

};


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  constructor(private http: HttpClient) { }


  login (data: Login): Observable<UserSession>  {
    console.log('...validating login credentials');
    return this.http.post<UserSession>(Settings.base_url + '/api/auth/v1/signin', data , httpOptions).pipe(
      tap((token: any) => console.log('Login session created with token ' + JSON.stringify(token)),
      catchError(error => of('error: ' + error))));
  }
}
