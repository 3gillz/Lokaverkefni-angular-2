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
    public goalForm: FormGroup;

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

        this.goalForm = new FormGroup({
      customer_CID: new FormControl('', <any>Validators),
      kg: new FormControl('', <any>Validators),
      percentage: new FormControl('', <any>Validators),
      description: new FormControl('', <any>Validators),
      diameter: new FormControl('', <any>Validators),
      startDate: new FormControl('', <any>Validators),
      dueDate: new FormControl('', <any>Validators) 

    });
  }

  ngOnInit() {
  }

  clear()
  {
    this.measureCMForm.reset();
    this.measureMMForm.reset();
    this.goalForm.reset();
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
      this.addNewMeasureCM(measureCMForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.measureCMForm.reset();
        }
      });
    }
    else{this.popUpService.errorMessage();}
  }

      submitGoal(goalForm){
      console.log(goalForm.valid);
      console.log(goalForm.value);
    if(goalForm.valid){
      this.addNewGoal(goalForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.goalForm.reset();
        }
      });
    }
    else{this.popUpService.errorMessage("Sorry, something went wrong");}
  }

    addNewMeasureMM(measureMMForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(measureMMForm).length; x++) {
      let value = (<any>Object).values(measureMMForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(measureMMForm)[x]}=${(<any>Object).values(measureMMForm)[x]}`;
      }
    }
    let body = `${measureMMForm}` + optionalBody;
    let url = this.apiRoot + "api/MeasurmentMM/Add";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.infoMessage("Customer added", "Just now") : this.popUpService.errorMessage("Sorry, something went wrong");
        })
    });
  }
  
      addNewMeasureCM(measureCMForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(measureCMForm).length; x++) {
      let value = (<any>Object).values(measureCMForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(measureCMForm)[x]}=${(<any>Object).values(measureCMForm)[x]}`;
      }
    }
    let body = `${measureCMForm}` + optionalBody;
    let url = this.apiRoot + "api/MeasurmentCM/Add";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.updateInfoSuccess("Measurement added") : this.popUpService.errorMessage();
        })
    });
  }
  

      addNewGoal(goalForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(goalForm).length; x++) {
      let value = (<any>Object).values(goalForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(goalForm)[x]}=${(<any>Object).values(goalForm)[x]}`;
      }
    }
    let body = `${goalForm}` + optionalBody;
    let url = this.apiRoot + "api/Goals/Add";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.updateInfoSuccess("Goal added") : this.popUpService.errorMessage();
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