import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-david',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private router: Router
  ) { 
  };

  @HostListener('document:click', ['$event'])
  documentClick(event) {
    if(event.target.id === "detail"){
      this.router.navigate([ 'trainer/customers/detail/' + event.target.value ]);
    }
  }

  ngOnInit() {
  }

  public getAllCustomers = this.apiRoot + "api/Customer/GetAllCustomersByTRID";
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
            aaData: data
          })
        })
    },
    "iDisplayLength": 25,
    "columns": [
      {
        "class": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      {"data": "name"},
      {"data": "email"},
      {"data": "phone"},
      {"data": "kennitala"},
      {"data": "gender"},
      {"data": "height"}
    ],
    "order": [[1, 'asc']]
  }

  public detailsFormat(d) {

    return `<table cell-padding="5" cell-spacing="0" border="0" class="table table-hover table-condensed">
            <tbody><tr>
                <td style="width:100px">Project Title:</td>
                <td>${d.name}</td>
            </tr>
            <tr>
                <td>Deadline:</td>
                <td>${d.email}</td>
            </tr>
            <tr>
                <td>Extra info:</td>
                <td>And any further details here (images etc)...</td>
            </tr>
            <tr>
                <td>Comments:</td>
                <td>${d.kennitala}</td>
            </tr>
            <tr>
                <td>Action:</td>
                <td><button id="detail" value="${d.CID}" class="btn btn-success">Detail</button></td>
            </tr></tbody>
        </table>`
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    let body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }

}
