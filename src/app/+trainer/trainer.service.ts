import { Injectable, Inject } from '@angular/core';

@Injectable()
export class TrainerService {

  constructor(
    @Inject("apiRoot") private apiRoot
  ) { }


      addNewCustomer(customerForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(customerForm).length; x++) {
      let value = (<any>Object).values(customerForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(customerForm)[x]}=${(<any>Object).values(customerForm)[x]}`;
      }
    }
    let body = `name=${customerForm.name}` + optionalBody;
    let url = this.apiRoot + "api/Customer/AddCustomer";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.updateInfoSuccess("Customer added") : this.popUpService.errorMessage();
        })
    });
    }

}
