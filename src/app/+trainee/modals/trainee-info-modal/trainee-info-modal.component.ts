import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TraineeService } from '../../trainee.service';

@Component({
  selector: 'app-trainee-info-modal',
  templateUrl: './trainee-info-modal.component.html',
  styleUrls: ['./trainee-info-modal.component.css']
})
export class TraineeInfoModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  public basicInfoForm: FormGroup;

  constructor(
      public traineeService: TraineeService
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
  }

  closeModal(){
    this.close.emit();
  }
  submit(basicInfoForm: any, isValid: boolean) {
    this.traineeService.submitNewInfo(basicInfoForm, isValid);
  }

}
