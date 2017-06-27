import { Component, OnInit, Input, Inject, HostListener, OnChanges } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Zipcodes } from '../../../models/zipcodes';
import { TrainerService } from '../../trainer.service';
import { MiscService } from './../../../services/misc.service';
import { AccountService } from './../../../services/account.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../../../services/popup.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

    @Input() agreedInput: boolean;
    public customerForm: FormGroup;
    public submitted: boolean = false;
    resolved: boolean = true;
    zipcodes : Zipcodes[] = [];

  constructor(
    @Inject("apiRoot") private apiRoot,
    private router: Router,
    private http: Http,
    private popUpService: PopUpService,
    public miscService: MiscService,
    private accountService: AccountService,
    private trainerService: TrainerService
  ) { 
    this.customerForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      password: new FormControl('', <any>Validators.required),
      confirmPassword: new FormControl('', [<any>Validators.required, this.validatePasswordConfirmation.bind(this)]),
      kennitala: new FormControl('', [<any>Validators.required, this.validateKennitalaControl.bind(this), <any>Validators.maxLength(10), <any>Validators.minLength(10)]),
      phone: new FormControl('', [<any>Validators.maxLength(7), <any>Validators.minLength(7)]),
      gender: new FormControl('', <any>Validators.required),
      jobDifficulty: new FormControl('', <any>Validators.required),
      height: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(3), <any>Validators.minLength(2)]),
      foodPref: new FormControl('', <any>Validators),
      injury: new FormControl('', <any>Validators),
      allergy: new FormControl('', <any>Validators),
      address: new FormControl('', <any>Validators.required),
      TRID: new FormControl(''),
      zipcodes_ZIP: new FormControl('', <any>Validators.required),
      country: new FormControl('', <any>Validators)
    });
  }


  ngOnChanges(){
    this.customerForm.patchValue({terms: this.agreedInput})
  }

  ngOnInit() {
    this.miscService.getZipcodes()
    .then(z => this.zipcodes = z);
  }

    validatePasswordConfirmation(control: FormControl): any {
    if(this.customerForm) {
      return control.value === this.customerForm.get('password').value ? null : { notSame: true}
    }
  }

    validateKennitalaControl(control: FormControl): any {
    if(this.customerForm) {
      return this.miscService.vartoluProfun(control.value) ? null : { notValid: true}
    }
  }

    beTrue(control: FormControl): any  {
    if(this.customerForm) {
      return control.value == true ? null : { notValid: true};
    }
  }
  nonNegative(control: FormControl): any  {
    if(this.customerForm) {
      return control.value < 0 ? { notValid: true} : null;
    }
  }

    submitCustomer(customerForm){
    this.submitted = true;
    if(customerForm.valid){
      this.resolved = false;
      this.accountService.registerUser(customerForm.value, "trainee")
      .then( data => {
        if(data[0]){
          let form = customerForm.value;
          let trid = JSON.parse(localStorage.getItem('user')).TRID;
          form.TRID = trid;
          this.accountService.registerTrainerOrTrainee(customerForm.value, data[1]._body, false)
          .then( data =>{
            if(data){
              this.router.navigate(['login']);
              this.resolved = true;              
            }else if(!data){
              this.resolved = true;              
            }
          })
        }
        else if(!data[0]){
          this.resolved = true;
        }
      })
    }
  }


  initialZipcode: any = -1;
  place: string = "Place";
  zipCodeChange(zip){
    for(let x = 0; x < this.zipcodes.length; x++){
      if(this.zipcodes[x].ZIP == zip){
        this.place = this.zipcodes[x].place;
      }
    }
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
