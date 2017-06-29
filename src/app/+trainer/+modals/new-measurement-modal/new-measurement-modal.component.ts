import { CustomerService } from './../../customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-measurement-modal',
  templateUrl: './new-measurement-modal.component.html',
  styleUrls: ['./new-measurement-modal.component.css']
})

export class NewMeasurementModalComponent implements OnInit {

  measureMMForm: FormGroup;
  public submitted: boolean = false;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private customerService: CustomerService
  ) {
    this.measureMMForm = new FormGroup({
      chest: new FormControl('', <any>Validators.required),
      abdominal: new FormControl('', <any>Validators.required),
      thigh: new FormControl('', <any>Validators.required),
      tricep: new FormControl('', <any>Validators.required),
      subscapular: new FormControl('', <any>Validators.required),
      suprailiac: new FormControl('', <any>Validators.required),
      axilliary: new FormControl('', <any>Validators.required),
      kg: new FormControl('', <any>Validators.required)
    });
  }

  ngOnInit() {
  }

  clear() {
    this.measureMMForm.reset();
    this.close.emit()
    this.submitted = false;
  }


  closeModal() {
    this.close.emit();
  }
  submitMeasureMM(measureMMForm) {
    this.submitted = true;
    if (measureMMForm.valid) {
      this.customerService.addNewMeasureMM(measureMMForm.value)
        .then((resolve) => {
          if (resolve === true) {
            this.clear()
          }
        });
    }
    //else{this.popUpService.errorMessage();}
  }

}

