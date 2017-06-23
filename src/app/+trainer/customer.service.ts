import { config } from './../smartadmin/smartadmin.config';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../services/popup.service";
import { Router } from '@angular/router';

@Injectable()
export class CustomerService {

  constructor
  (
    @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http,
    private router: Router
  ) { }


getCustomer(CID: number){
    let url = this.apiRoot + "api/Customer/" + CID;
    console.log(url);
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        })
    });
  }

  getCustomerGoal(CID: number){
        let url = this.apiRoot + "api/Goals/" + CID;
    console.log(url);
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((goalData) => {
          resolve(goalData);
        })
    });
  }

}
