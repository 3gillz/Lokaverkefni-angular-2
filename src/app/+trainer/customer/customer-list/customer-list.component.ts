import { Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { TrainerService } from '../../trainer.service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare var $: any;

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styles: []
})
export class CustomerListComponent implements OnInit {


  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private trainerService: TrainerService
    ) { }

  ngOnInit() {}

  public getAllCustomers = this.apiRoot + "api/Customer/GetAllCustomers";
  token = localStorage.getItem('access_token');
  headers = new Headers({ 'Authorization': "Bearer " + this.token, 'Content-Type': 'application/x-www-form-urlencoded' });
  requestOptions = new RequestOptions({ headers: this.headers });
  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.http.get(this.getAllCustomers, this.requestOptions)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe((data) => {
          callback({
            aaData: data.slice(0, 100)
          })
        })
    },
    select: true,
    columns: [
      { data: "CID" },
      { data: "name" },
      { data: "email" },
      { data: "phone" }
    ],
    buttons:[
      {
        extend: 'selected',
          action: function ( e, dt ) {
            var rowData = dt.row( { selected: true } ).data();
            console.log( rowData );
          }
      }
    ]
  };

  private extractData(res: Response) {
    let body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
