import { Zipcodes } from './../../../models/zipcodes';
import { I18nService } from './../../../smartadmin/i18n/i18n.service';
import { languages } from './../../../smartadmin/i18n/languages.model';
import { AccountService } from './../../../services/account.service';
import { MiscService } from './../../../services/misc.service';
import { Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainee-register-form',
  templateUrl: './trainee-register-form.component.html',
  styleUrls: ['./trainee-register-form.component.css']
})
export class TraineeRegisterFormComponent implements OnInit, OnChanges {

  @Input() agreedInput: boolean;
  public registerTraineeForm: FormGroup;
  public submitted: boolean = false;
  resolved: boolean = true;
  public countries: Array<any>;
  public currentCountry: string;
  zipcodes : Zipcodes[] = [];
  
  constructor(
    private accountService: AccountService,
    public miscService: MiscService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private i18nService: I18nService
  )
  {
    this.registerTraineeForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      email: new FormControl('', <any>Validators.required),
      password: new FormControl('', <any>Validators.required),
      confirmPassword: new FormControl('', [<any>Validators.required, this.validatePasswordConfirmation.bind(this)]),
      address: new FormControl('', <any>Validators.required),
      phone: new FormControl('', [<any>Validators.maxLength(7), <any>Validators.minLength(7)]),
      kennitala: new FormControl('', [<any>Validators.required, this.validateKennitalaControl.bind(this), <any>Validators.maxLength(10), <any>Validators.minLength(10)]),
      gender: new FormControl('', <any>Validators.required),
      terms: new FormControl('', [<any>Validators.required, this.beTrue.bind(this)]),
      country: new FormControl('Iceland', <any>Validators.required),
      height: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(3), <any>Validators.minLength(2)]),
      jobDifficulty: new FormControl('', <any>Validators.required),
      TRID: new FormControl('', <any>Validators.required),
      zipcodes_ZIP: new FormControl('', [<any>Validators.required, this.nonNegative.bind(this) ]),
      foodPref: new FormControl(''),
      injury: new FormControl(''),
      allergy: new FormControl(''),
    });

  }
  ngOnChanges(){
    this.registerTraineeForm.patchValue({terms: this.agreedInput})
  }
  ngOnInit() {
    this.countries = languages;
    this.currentCountry = this.i18nService.currentLanguage.alt;
    this.activatedRoute.params.subscribe(params => {
      this.registerTraineeForm.patchValue({TRID: +params['id']})
    });
    this.miscService.getZipcodes()
      .then(z => this.zipcodes = z);
  }
  beTrue(control: FormControl): any  {
    if(this.registerTraineeForm) {
      return control.value == true ? null : { notValid: true};
    }
  }
  nonNegative(control: FormControl): any  {
    if(this.registerTraineeForm) {
      return control.value < 0 ? { notValid: true} : null;
    }
  }
  
  validatePasswordConfirmation(control: FormControl): any {
    if(this.registerTraineeForm) {
      return control.value === this.registerTraineeForm.get('password').value ? null : { notSame: true}
    }
  }
  validateKennitalaControl(control: FormControl): any {
    if(this.registerTraineeForm) {
      return this.miscService.vartoluProfun(control.value) ? null : { notValid: true}
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

  submit(registerTraineeForm){
    this.submitted = true;
    if(registerTraineeForm.valid){
      this.resolved = false;
      this.accountService.registerUser(registerTraineeForm.value, "trainee")
      .then( data => {
        if(data[0]){
          this.accountService.registerTrainerOrTrainee(registerTraineeForm.value, data[1]._body, false)
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
