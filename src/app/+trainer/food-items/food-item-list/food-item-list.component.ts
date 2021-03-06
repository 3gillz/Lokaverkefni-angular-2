import { Component, OnInit, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-food-item-list',
  templateUrl: './food-item-list.component.html',
  styleUrls: ['./food-item-list.component.css']
})
export class FoodItemListComponent implements OnInit {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http
    ) { }

  ngOnInit() {}
  public REST_ROOT = this.apiRoot + "api/FoodItem/GetAll";
  token = localStorage.getItem('access_token');
  headers = new Headers({ 'Authorization': "Bearer " + this.token, 'Content-Type': 'application/x-www-form-urlencoded' });
  requestOptions = new RequestOptions({ headers: this.headers });
  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.http.get(this.REST_ROOT, this.requestOptions)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe((data) => {
          callback({
            aaData: data
          })
        })
    },
    iDisplayLength: 25,
    columns: [ 
      {data: 'name'}, 
      {data: 'carbohydrate'}, 
      {data: 'protein'}, 
      {data: 'fat'}, 
      {data: 'kcal'}, 
      {data: 'water'}, 
      {data: 'colestrol'},
      {data: 'addedSugar'}
    ],
    buttons: [
      'colvis'
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

