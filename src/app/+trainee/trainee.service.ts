import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { PopUpService } from "../services/popup.service";

@Injectable()
export class TraineeService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private popUpService: PopUpService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: any;

  submitNewInfo(model: any, isValid: boolean) {
    if (isValid) {
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
          localStorage.setItem('user', JSON.stringify(data));
          this.user = data;
          this.popUpService.updateInfoSuccess("Info updated");
        },
        error => {
          this.popUpService.errorMessage();
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
          this.popUpService.updateInfoSuccess("Profile image updated");
        },
        error => {
          this.popUpService.errorMessage();
        }
        )
    }
  }

}
