import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class TrainerService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http
  ) {
    this.getCustomers();
   }

  customerList:any;
  
  getCustomers() {
    let loginUrl = this.apiRoot + "api/Customer/GetAllCustomers";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    this.http.get(loginUrl, options)
      .subscribe(response => {
        console.log(response.json())
        this.customerList = response.json()
      }, error => {
        alert("Something Is Not Right");
        console.log(JSON.stringify(error.json()));
      });
  }
}
