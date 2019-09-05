import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

  constructor() { }

  lng = 3.4241753;
  lat = 6.4255113;

  ngOnInit() {
  }

}
