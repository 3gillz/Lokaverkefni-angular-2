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
        console.log(response.json())
        localStorage.setItem('access_token', response.json().access_token);
        localStorage.setItem('userName', response.json().userName);
        this.afterLoginNavigation(response.json().path);
      }, error => {
        alert("Something Is Not Right");
        console.log(JSON.stringify(error.json()));
      });
  }
  afterLoginNavigation(path: string){
    if(path == "trainee"){
      this.router.navigate([ 'profile/' ]);
    }
    else if(path == "trainer"){
      this.router.navigate([ 'trainer/' ]);
    }
  }
  logout() {
    localStorage.clear()
    this.router.navigate([""]);
  }

}
