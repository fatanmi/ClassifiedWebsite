import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService : AccountService,
    private router: Router,
  ) { }
  username : string;
  password : string;

  ngOnInit() {
  }

  doLogin(){
    let data = {
      username:this.username,
      password:this.password
    };
    this.accountService.userLogin(data).subscribe(
      (response :any)=>{
        console.log(response);
        localStorage.setItem('access_token',response.data.token)
        localStorage.setItem('username',response.data.username);
        this.router.navigate(['/merchant/profile']);
      },
      (error :any)=>{
        console.log(error);
      }
    )
  }

}
