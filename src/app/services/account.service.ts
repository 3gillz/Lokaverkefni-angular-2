import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private router: Router
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
        alert("Something Is Not Right");
        console.log(JSON.stringify(error.json()));
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
          console.log(data)
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate([ 'profile/' ]);
        })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""]);
  }

}
