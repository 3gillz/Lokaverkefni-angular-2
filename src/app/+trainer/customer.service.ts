import { GalleryImage } from './../models/galleryImage';
import { MeasurementMM } from './../models/measurementMM';
import { MeasurementCM } from './../models/measurementCM';
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

// Get customer informatio for Customer detail page
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
// Get current goal of customer for Customer detail page
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

  // Get a list of MM measurements for Costumer detail page 
    getmeasurementsMM(CID: number){
        let url = this.apiRoot + "api/MeasurmentMM/GetAllByCID/" + CID;
    console.log(url);
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((measureMMData) => {
          resolve(measureMMData);
        })
    });
  }

  // Get progress images for a user for for Customer detail page 
    getProgressImages(CID: number){
    let url = this.apiRoot + "api/ProgressImage/GetAllByCID/" + CID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(progImgData =>{
          resolve(progImgData);
        })
    });
  }
    public pictures = [];
  pushImagesToGallery(data){
    this.pictures = [];
    for(let x = 0; x < data.length; x++){
      let image = new GalleryImage(
        data[x].date,
        'data:image/png;base64,' + data[x].image
      );
      this.pictures.push(image);
    }
  }

    addNewGoal(goalForm, due, start, cid): Promise<boolean>{
    let optionalBody = '';
    for (let x = 0; x < Object.keys(goalForm).length; x++) {
      let value = (<any>Object).values(goalForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(goalForm)[x]}=${(<any>Object).values(goalForm)[x]}`;
      }
    }
    let body = `${goalForm}`+ "&dueDate=" + due + "&startDate="+ start + "&customer_CID="+ cid + optionalBody;
    let url = this.apiRoot + "api/Goals/Add";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.successMessage("Goal added", "Just now") : this.popUpService.errorMessage("Sorry, something went wrong");
        })
        
    });
  }


}
