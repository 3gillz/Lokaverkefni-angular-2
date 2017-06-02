import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { NotificationService } from "../smartadmin/utils/notification.service";
import { TraineePopUpService } from "./trainee-popup.service";

@Injectable()
export class TraineeService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private fb: FormBuilder,
    private http: Http,
    private notificationService: NotificationService,
    private traineePopUpService: TraineePopUpService,
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
      if (data.address != this.user.address || data.allergy != this.user.allergy || data.email != this.user.email || data.jobDifficulty != this.user.jobDifficulty ||
        data.foodPref != this.user.foodPref || data.name != this.user.name || data.phone != this.user.phone || data.injury != this.user.injury
        || data.kennitala != this.user.kennitala || data.height != this.user.height) {
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
    if (isValid && this.infoChange) {
      let optionalBody = '';
      for (let x = 6; x < Object.keys(model).length; x++) {
        let value = (<any>Object).values(model)[x];
        if (value !== null && value !== "") {
          optionalBody += `&${Object.keys(model)[x]}=${(<any>Object).values(model)[x]}`;
        }
      }
      let merge = Object.assign(this.user, model);
      let body = `name=${merge.name}&email=${merge.email}&phone=${merge.phone}&gender=${merge.gender}&kennitala=${merge.kennitala}&height=${merge.height}&jobDifficulty=${merge.jobDifficulty}&address=${merge.address}&country=${merge.country}&zipcodes_ZIP=${merge.zipcodes_ZIP}&jobDifficulty=${merge.jobDifficulty}` + optionalBody;
      let url = this.apiRoot + "api/Customer/UpdateCustomer";
      let token = localStorage.getItem('access_token');
      let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
      let requestOptions = new RequestOptions({ headers: headers });
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          console.log(data)          
          localStorage.setItem('user', JSON.stringify(data));
          this.user = data;
          this.traineePopUpService.updateInfoSuccess("Info updated");
        },
        error => {
          this.traineePopUpService.errorMessage();
        }
        )
    }
  }

  saveProfileImage(image: string) {
    if(image != this.user.profileImagePath){
      let url = this.apiRoot + "api/Customer/UpdateProfileImage";
      let token = localStorage.getItem('access_token');
      let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
      let requestOptions = new RequestOptions({ headers: headers });
      let body = `profileImagePath=${image}`;
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          let user = JSON.parse(localStorage.getItem('user'));
          user.profileImagePath = data;
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
          this.traineePopUpService.updateInfoSuccess("Profile image updated");
        },
        error => {
          this.traineePopUpService.errorMessage();
        }
        )
    }
  }

}
