import { CustomerService } from './../../customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from './../../../models/customer';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.css']
})
export class EditCustomerModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  public basicInfoForm: FormGroup;

  constructor(
    public customerService : CustomerService
  ) {
        this.basicInfoForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(48)]),
      kennitala: new FormControl('', <any>Validators.required),
      phone: new FormControl('', <any>Validators.required),
      email: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      address: new FormControl('', <any>Validators.required),
      jobDifficulty: new FormControl('', <any>Validators.required),
      height: new FormControl('', <any>Validators.required),
      allergy: new FormControl(''),
      injury: new FormControl(''),
      foodPref: new FormControl('')
    });
   }

  ngOnInit() {
    console.log ("Edit: " + this.customerService.customer)
  }
}
