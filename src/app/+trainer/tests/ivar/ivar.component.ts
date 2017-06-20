import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../../../services/popup.service";

@Component({
  selector: 'app-ivar',
  templateUrl: './ivar.component.html',
  styleUrls: ['./ivar.component.css']
})



export class IvarComponent implements OnInit {

    public measureMMForm: FormGroup;
    public measureCMForm: FormGroup;

  constructor(
    @Inject("apiRoot") private apiRoot,
    private router: Router,
    private http: Http,
    private popUpService: PopUpService,
  ) { 
        this.measureCMForm = new FormGroup({
      customer_CID: new FormControl('', <any>Validators),
      butt: new FormControl('', <any>Validators),
      waist: new FormControl('', <any>Validators),
      hip: new FormControl('', <any>Validators),
      thigh: new FormControl('', <any>Validators),
      armLoose: new FormControl('', <any>Validators),
      armFlexed: new FormControl('', <any>Validators),
      shoulders: new FormControl('', <any>Validators),
      performedByTrainer: new FormControl('', <any>Validators)
    });


        this.measureMMForm = new FormGroup({
      customer_CID: new FormControl('', <any>Validators),
      chest: new FormControl('', <any>Validators),
      abdominal: new FormControl('', <any>Validators),
      thigh: new FormControl('', <any>Validators),
      tricep: new FormControl('', <any>Validators),
      subscapular: new FormControl('', <any>Validators),
      suprailiac: new FormControl('', <any>Validators),
      axilliary: new FormControl('', <any>Validators),
      kg: new FormControl('', <any>Validators)
    });
  }

  ngOnInit() {
  }

    submitMeasureMM(measureMMForm){
      console.log(measureMMForm.valid);
      console.log(measureMMForm.value);
    if(measureMMForm.valid){
      this.addNewMeasureMM(measureMMForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.measureMMForm.reset();
        }
      });
    }
    else{this.popUpService.errorMessage();}
  }

      submitMeasureCM(measureCMForm){
      console.log(measureCMForm.valid);
      console.log(measureCMForm.value);
    if(measureCMForm.valid){
      this.addNewMeasureMM(measureCMForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.measureCMForm.reset();
        }
      });
    }
    else{this.popUpService.errorMessage();}
  }

    addNewMeasureMM(measureMMForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(measureMMForm).length; x++) {
      let value = (<any>Object).values(measureMMForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(measureMMForm)[x]}=${(<any>Object).values(measureMMForm)[x]}`;
      }
    }
    let body = `name=${measureMMForm.name}` + optionalBody;
    let url = this.apiRoot + "api/Customer/AddCustome";
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

        private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  }