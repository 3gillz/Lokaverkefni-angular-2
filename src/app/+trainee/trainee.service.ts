import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class TraineeService {

  constructor(
    private fb: FormBuilder
  ) {
    this.basicInfoForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(48)]),
      phone: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      address: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      allergy: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      foodPref: new FormControl('', <any>Validators.required),
    });
    // this.basicInfoForm.valueChanges.subscribe(data => {
    //   console.log('Form changes', data)
    // })
  }

  user = JSON.parse(localStorage.getItem('user'));
  infoChange: boolean;
  infoOpened(){
    console.log("subscribed");
    this.basicInfoForm.valueChanges.subscribe(data => {
      if(data.address != this.user.address || data.allergy != this.user.allergy || data.email != this.user.email || data.foodPref != this.user.foodPref || data.name != this.user.name || data.phone != this.user.phone){ 
        this.infoChange = true;
        console.log('Changed');
      }
      else{
        this.infoChange = false;
        console.log('Unchanged');
      }
    })  
  }


  public basicInfoForm: FormGroup; // our model driven form
  submit(model: any, isValid: boolean ){
    if(isValid){
      console.log(model);
      console.log(isValid);
    }
  }




}
