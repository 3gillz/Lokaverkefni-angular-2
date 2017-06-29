import { PopUpService } from './../../../services/popup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementMM } from './../../../models/measurementMM';
import { FoodProgram } from './../../../models/foodProgram';
import { TrainingProgram } from './../../../models/trainingProgram';
import { Goals } from './../../../models/goals';
import { Customer } from './../../../models/customer';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from "rxjs/Rx";

import { CustomerService } from './../../customer.service';

declare var $ : any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

    customer : Customer;
    foodProgram : FoodProgram[] = [];
    trainingPrograms : TrainingProgram[] = [];
    goals : Goals[] = [];
    CID : number;
    measurementsMM : MeasurementMM[] = [];
    goalForm : FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private customerService : CustomerService,
    private popUpService : PopUpService
    ){
    }
    date: any;
  ngOnInit() {
    this.date = new Date();
    this.route.params.forEach((params: Params)=> {
      let id = +params['id'];
      this.CID = id;
      
      this.customerService.getCustomer(id)
        .then((data)=>{
          this.customer = data as Customer;
          this.customerService.customer  = this.customer;
          console.log("Frá Service" + this.customerService.customer)
          // console.log(data);
          this.customerService.getCurrentFoodProgram(this.customer.CID);
          this.customerService.getCurrentTrainingProgram(this.customer.CID);
        })

      this.customerService.getCustomerGoal(id)
        .then((goalData)=> {
          this.customerService.goal = goalData as Goals;
          // console.log(this.goal);     
        })

      this.customerService.getmeasurementsMM(id)
        .then((measureMMData)=> {
          this.measurementsMM = measureMMData as MeasurementMM[];
          // console.log(this.measurementsMM);     
        })  
      
      
      // console.log(id)
      
      this.customerService.getProgressImages(id)
      .then(data => {
        this.customerService.pushImagesToGallery(data);
      })
    })
  }

    options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.customerService.getmeasurementsMM(this.CID)
        .catch(this.handleError)
        .then((data) => {
          callback({
            aaData: data
          })
        })
    },
    "iDisplayLength": 15,
    "columns": [
      {
        "class": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      {"data": "date"},
      {"data": "bmi" },
      {"data": "lbm"},
      {"data": "fatPercentage"},
      {"data": "kg"},
      
    ], 
    "order": [[1, 'asc']]
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  goBack(){
    this.location.back();
  }

}
