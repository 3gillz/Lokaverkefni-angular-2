import { AccountService } from './../../../services/account.service';
import { MiscService } from './../../../services/misc.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-register-form',
  templateUrl: './trainer-register-form.component.html',
  styleUrls: ['./trainer-register-form.component.css']
})
export class TrainerRegisterFormComponent implements OnInit {

  public registerTrainerForm: FormGroup;
  public submitted: boolean = false;
  resolved: boolean = true;

  constructor(
    private accountService: AccountService,
    public miscService: MiscService,
    private router: Router
  )
  {
    this.registerTrainerForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      password: new FormControl('', <any>Validators.required),
      confirmPassword: new FormControl('', [<any>Validators.required, this.validatePasswordConfirmation.bind(this)]),
      address: new FormControl('', <any>Validators.required),
      location: new FormControl('', <any>Validators.required),
      phone: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(7), <any>Validators.minLength(7)]),
      kennitala: new FormControl('', [<any>Validators.required, this.validateKennitalaControl.bind(this), <any>Validators.maxLength(10), <any>Validators.minLength(10)]),
      gender: new FormControl('', <any>Validators.required),
      terms: new FormControl('', <any>Validators.required)
    });

  }
  validatePasswordConfirmation(control: FormControl): any {
    if(this.registerTrainerForm) {
      return control.value === this.registerTrainerForm.get('password').value ? null : { notSame: true}
    }
  }
  validateKennitalaControl(control: FormControl): any {
    if(this.registerTrainerForm) {
      return this.miscService.vartoluProfun(control.value) ? null : { notValid: true}
    }
  }

  ngOnInit() {
  }

  submit(registerTrainerForm){
    this.submitted = true;
    if(registerTrainerForm.valid){
      this.resolved = false;
      this.accountService.registerUser(registerTrainerForm.value, "trainer")
      .then( data => {
        if(data[0]){
          this.accountService.registerTrainerOrTrainee(registerTrainerForm.value, data[1]._body, true)
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


}
