import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class TraineeService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private fb: FormBuilder,
    private http: Http
  ) {
    this.basicInfoForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(48)]),
      phone: new FormControl('', <any>Validators.required),
      email: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      kennitala: new FormControl('', <any>Validators.required),
      address: new FormControl('', <any>Validators.required),
      allergy: new FormControl(''),
      foodPref: new FormControl('')
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newProfileImagePath = this.user.profileImagePath;
  }

  public basicInfoForm: FormGroup;
  user: any;
  infoChange: boolean;
  newProfileImagePath: string;
  sub: any;
  subscribeToChange() {
    this.sub = this.basicInfoForm.valueChanges.subscribe(data => {
      if (data.address != this.user.address || data.allergy != this.user.allergy
        || data.email != this.user.email || data.kennitala != this.user.kennitala
        || data.foodPref != this.user.foodPref || data.name != this.user.name ||
        data.phone != this.user.phone) {
        this.infoChange = true;
      }
      else {
        this.infoChange = false;
      }
    })
  }
  unsubscribeToChange() {
    this.sub.unsubscribe();
  }

  submitNewInfo(model: any, isValid: boolean) {
    if (isValid) {
      let merge = Object.assign(this.user, model);
      let body = `name=${merge.name}&email=${merge.email}&phone=${merge.phone}&gender=${merge.gender}&kennitala=${merge.kennitala}&height=${merge.height}&jobDifficulty=${merge.jobDifficulty}&address=${merge.address}&country=${merge.country}&foodPref=${merge.foodPref}&injury=${merge.injury}&allergy=${merge.allergy}&zipcodes_ZIP=${merge.zipcodes_ZIP}&profileImagePath=${merge.profileImagePath}`;
      let url = this.apiRoot + "api/Customer/UpdateCustomer";
      let token = localStorage.getItem('access_token');
      let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
      let requestOptions = new RequestOptions({ headers: headers });
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          if(data){
            localStorage.setItem('user', JSON.stringify(data));
            this.user = data;
          }
        })
    }
  }

  saveProfileImage(image: string){
    let url = this.apiRoot + "api/Customer/UpdateProfileImage";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    let body =  `profileImagePath=${image}`;
    this.http.put(url, body, requestOptions)
      .map(res => res.json())
      .subscribe((data) => {
        if(data){
          let user = JSON.parse(localStorage.getItem('user'));        
          user.profileImagePath = data;       
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
        }
      })
  }

}
