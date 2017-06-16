import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-trainer-register-form',
  templateUrl: './trainer-register-form.component.html',
  styleUrls: ['./trainer-register-form.component.css']
})
export class TrainerRegisterFormComponent implements OnInit {

  public regiserTrainerForm: FormGroup;
  public submitted: boolean = false;

  constructor()
  {
    this.regiserTrainerForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      password: new FormControl('', <any>Validators.required),
      confirmPassword: new FormControl('', [<any>Validators.required, this.validatePasswordConfirmation.bind(this)]),
      address: new FormControl('', <any>Validators.required),
      location: new FormControl('', <any>Validators.required),
      phone: new FormControl('', <any>Validators.required),
      kennitala: new FormControl('', <any>Validators.required),
      gender: new FormControl('', <any>Validators.required),
      terms: new FormControl('', <any>Validators.required)
    });

  }
  validatePasswordConfirmation(control: FormControl): any {
    if(this.regiserTrainerForm) {
      return control.value === this.regiserTrainerForm.get('password').value ? null : { notSame: true}
    }
  }

  ngOnInit() {
  }

  submit(regiserTrainerForm){
    this.submitted = true;
    console.log("valid : " + regiserTrainerForm.valid)
    console.log(regiserTrainerForm.value)
  }


}
