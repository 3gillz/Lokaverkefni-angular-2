import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Zipcodes } from './ivar';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../../../services/popup.service";

@Component({
  selector: 'app-ivar',
  templateUrl: './ivar.component.html',
  styleUrls: ['./ivar.component.css']
})



export class IvarComponent implements OnInit {

    public customerForm: FormGroup;
    zipcodes : Zipcodes[] = [];

  constructor(
    @Inject("apiRoot") private apiRoot,
    private router: Router,
    private http: Http,
    private popUpService: PopUpService,
  ) { 
        this.customerForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      kennitala: new FormControl('', <any>Validators.required),
      phone: new FormControl('', <any>Validators.required),
      gender: new FormControl('', <any>Validators.required),
      jobDifficulty: new FormControl('', <any>Validators.required),
      height: new FormControl('', <any>Validators.required),
      foodPref: new FormControl('', <any>Validators),
      injury: new FormControl('', <any>Validators),
      allergy: new FormControl('', <any>Validators),
      address: new FormControl('', <any>Validators.required),
      zipcodes_ZIP: new FormControl('', <any>Validators.required),
      profileImagePath: new FormControl('', <any>Validators),
      country: new FormControl('', <any>Validators)
    });
  }

  ngOnInit() {
    this.getZipcodes()
    .then(z => this.zipcodes = z);
  }

    submitCustomer(customerForm){
      console.log(customerForm.valid);
      console.log(customerForm.value);
    if(customerForm.valid){
      this.addNewCustomer(customerForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.customerForm.reset();
        }
      });
    }
    else{this.popUpService.errorMessage();}
  }

    addNewCustomer(customerForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(customerForm).length; x++) {
      let value = (<any>Object).values(customerForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(customerForm)[x]}=${(<any>Object).values(customerForm)[x]}`;
      }
    }
    let body = `name=${customerForm.name}` + optionalBody;
    let url = this.apiRoot + "api/Customer/AddCustomer";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.updateInfoSuccess("Customer added") : this.popUpService.errorMessage();
        })
    });
    }

    getZipcodes(): Promise<Zipcodes[]>{
    let url = this.apiRoot + "api/Zipcodes/GetAll";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, requestOptions)
        .toPromise()
        .then(response => response.json() as Zipcodes[])
        .catch(this.handleError)
      }
        private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  }