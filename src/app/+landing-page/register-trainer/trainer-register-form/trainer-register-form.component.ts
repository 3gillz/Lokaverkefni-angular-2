import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-trainer-register-form',
  templateUrl: './trainer-register-form.component.html',
  styleUrls: ['./trainer-register-form.component.css']
})
export class TrainerRegisterFormComponent implements OnInit {

  public regiserTrainerForm: FormGroup;

  constructor()
  {
    this.regiserTrainerForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      userName: new FormControl('', <any>Validators.required),
      password: new FormControl('', <any>Validators.required),
      confirmPassword: new FormControl('', <any>Validators.required),
      address: new FormControl('', <any>Validators.required),
      phone: new FormControl('', <any>Validators.required),
      kennitala: new FormControl('', <any>Validators.required),
      gender: new FormControl('', <any>Validators.required),
      profileImagePath: new FormControl('', <any>Validators.required)
    });
  }

//regex for password
// one lower case letter, one upper case letter, 
// one digit and one special character, min length 6
// => "^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"

  ngOnInit() {
  }

}
