import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private router: Router
  ) { 
  };

  ngOnInit() {
  }

  public getAllCustomers = this.apiRoot + "api/Exercise/GetAll";
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
          console.log(data)
          callback({
            aaData: data
          })
        })
    },
    "iDisplayLength": 15,
    "columns": [
      {
        "class": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      {"data": "name"},
      {"data": "type"}
    ], 
    "order": [[1, 'asc']]
  }
  public detailsFormat(d) {
    return `<table cell-padding="5" cell-spacing="0" border="0" class="table table-hover table-condensed">
            <tbody>
            <tr>
                <td style="width:100px">Name:</td>
                <td>${d.name}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>${d.type}</td>
            </tr>
            <tr>
                <td>Link:</td>
                <td><a href=${d.link} target="_blank">${d.link}</a></td>
            </tr>
            <tr>
                <td>Description:</td>
                <td>${d.description}</td>
            </tr>
            <tr>
                <td>Action:</td>
                <td><button id="edit" value="${d.EID}" class="btn btn-success">Edit</button></td>
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
