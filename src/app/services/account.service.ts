import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { PopUpService } from "./popup.service";

@Injectable()
export class AccountService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private router: Router,
    private popUpService: PopUpService
  ) { }

  login(email, password) {
    let loginUrl = this.apiRoot + "token";
    let body = `grant_type=password&username=${email.value}&password=${password.value}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(loginUrl, body, options)
      .subscribe(response => {
        localStorage.setItem('access_token', response.json().access_token);
        this.afterLoginResolver(response.json().path);
      }, error => {
        this.popUpService.errorMessage(error.json().error_description)
      });
  }

  afterLoginResolver(path: string){
    if(path == "trainee"){
      this.getTraineeThenNavigate();
    }
    else if(path == "trainer"){
      this.getTrainerThenNavigate();
    }
  }

  getTrainerThenNavigate(){
    let url = this.apiRoot + "api/Trainer/GetCurrentTrainer";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {  
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate([ 'trainer/' ]);
        })
  }

  getTraineeThenNavigate(){
    let url = this.apiRoot + "api/Customer/GetCurrentCustomer";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate([ 'profile/' ]);
        })
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["login/"]);
  }


  registerUser(model: any, role: string){
    let url = this.apiRoot + "api/Account/Register";
    let body = "Email=" + model.email + "&password=" + model.password 
                + "&ConfirmPassword=" + model.confirmPassword
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

  registerTrainerUrl: string = "api/Trainer/Register";
  trainerBody(model: any): string{
    let body = "Name=" + model.name + "&email=" + model.email + "&phone=" + model.phone
            + "&kennitala=" + model.kennitala + "&gender=" + model.gender + "&address="
            + model.address + "&location=" + model.location;
    return body;
  }
  registerTraineeUrl: string = "api/Customer/Register";
  traineeBody(model: any): string{
    let body =  "Name=" + model.name + "&email=" + model.email + "&kennitala=" + model.kennitala 
             + "&gender=" + model.gender + "&address=" + model.address + "&height=" + model.height
             + "&jobDifficulty=" + model.jobDifficulty + "&trainer_TRID=" + model.TRID + "&foodPref=" 
             + model.foodPref + "&injury=" + model.injury + "&allergy=" + model.allergy + "&zipcodes_ZIP="
              + model.zipcodes_ZIP + "&phone=" + model.phone;
    return body;
  }

  registerTrainerOrTrainee(model: any, data: any, trainer: boolean){
    let id = data.replace(/^"(.*)"$/, '$1');
    let body = trainer ? this.trainerBody(model) : this.traineeBody(model);
    let url = trainer ? this.registerTrainerUrl : this.registerTraineeUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(this.apiRoot + url, body + "&Id=" + id, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data)
          if(data){
            this.popUpService.successMessage("User registered", "Just now...")
          }else if(!data){
            this.popUpService.errorMessage("Sorry, something went wrong");
          }
        });
    });
  }
  

}
