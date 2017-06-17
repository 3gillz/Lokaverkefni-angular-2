import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopUpService } from "../services/popup.service";

@Injectable()
export class LandingPageService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http
  ) { }

  trainer: any;
  getTrainerCard(TRID: number){
    let url = this.apiRoot + "api/Trainer/card/" + TRID;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          this.trainer = data;
        })
    });
  }

  registerUser(model: any, role: string){
    let url = this.apiRoot + "api/Account/Register";
    let body = "Email=" + model.email + "&password=" + model.password + "&ConfirmPassword=" + model.confirmPassword
      + "&role=" + role;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .subscribe(response => {
          let answer = [ response.ok, response ];
          resolve(answer);  
        }, error =>  {
          let answer = [ error.ok, error ];
          let mess = (<any>Object).values(error.json().ModelState)[0].toString();
          this.popUpService.errorMessage(mess);
          resolve(answer);
        });
    });
  }

  registerTrainer(model: any, data: any){
    let id = data.replace(/^"(.*)"$/, '$1');
    let url = this.apiRoot + "api/Trainer/Register";
    let body = "Name=" + model.name + "&email=" + model.email + "&phone=" + model.phone
               + "&kennitala=" + model.kennitala + "&gender=" + model.gender + "&address="
               + model.address + "&location=" + model.location + "&Id=" + id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data)
          if(data){
            this.popUpService.successMessage("Trainer registered", "Just now...")
          }else if(!data){
            this.popUpService.errorMessage("Sorry, something went wrong");
          }
        });
    });
  }

}