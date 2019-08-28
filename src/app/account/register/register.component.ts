import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  personalProfileForm = true;
  businessProfileForm = false;

  constructor() {

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
  }

}
