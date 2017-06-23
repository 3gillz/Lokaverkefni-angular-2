import { FoodProgram } from './../../../models/foodProgram';
import { TrainingProgram } from './../../../models/trainingProgram';
import { Goals } from './../../../models/goals';
import { Customer } from './../../../models/customer';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { CustomerService } from './../../customer.service';


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

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private customerService : CustomerService
    ){}
    date: any;
  ngOnInit() {
    this.date = new Date();
    this.route.params.forEach((params: Params)=> {
      let id = +params['id'];
      this.CID = id;
      this.customerService.getCustomer(id)
        .then((data)=>{
          this.customer = data as Customer;
          console.log(data);
        })

      console.log(id)
      this.customerService
    })
  }

  goBack(){
    this.location.back();
  }

}
