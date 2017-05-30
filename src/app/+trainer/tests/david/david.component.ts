import { Component, OnInit, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-david',
  templateUrl: './david.component.html',
  styleUrls: ['./david.component.css']
})
export class DavidComponent implements OnInit {
   @ViewChild('inputId', {read: ViewContainerRef}) inputId;;
  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http
    ) { }

  fetched: boolean;
  kgTableData =  [ {
    "label": "Kg",
    "data": [ ],
    "lines": {
      "show": true
    },
    "color": "rgb(55,250,50)"
  },
  {
    "label": "Kg Average",
    "data": [ ],
    "lines": {
      "show": true
    },
    "color": "rgba(50,50,50, 0.5)"
  }];
  fatpercentageTableData =  [ {
    "label": "%",
    "data": [ ],
    "lines": {
      "show": true
    },
    "color": "rgb(55,250,50)"
  },
  {
    "label": "% average",
    "data": [ ],
    "lines": {
      "show": true
    },
    "color": "rgba(50,50,50, 0.5)"
  }];

  ngOnInit() {
    this.getMeasurementsMM();
  }

  getMeasurementsMM(){
    let url = this.apiRoot + "api/MeasurmentMM/GetAll";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    this.http.get(url, requestOptions)
        .map(res => res.json())
        .catch(this.handleError)
        .subscribe((data) => {
          this.sortKgAndPercentageData(data);
        })
  }

  sortKgAndPercentageData(data: any){
    let sumForAverage: number = 0;
    for(let x = 0; x < data.length; x++){
      sumForAverage += data[x].kg;
      let kg = [ data[x].date.substring(8,10), data[x].kg];
      this.kgTableData[0].data.push(kg);
      let per =  [ data[x].date.substring(8,10), data[x].fatPercentage];
      this.fatpercentageTableData[0].data.push(per);
    }
    this.findKgAverage(sumForAverage, data);
  }

  findKgAverage(sumForAverage, data){
    let average = sumForAverage/data.length;
    let ind = data.length - 1;
    this.kgTableData[1].data.push([ data[0].date.substring(8,10), data[0].kg ]);
    this.kgTableData[1].data.push([ data[ind].date.substring(8,10), average ]);
    this.fetched = true;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

 kgChartOptions = {
    xaxis : {
      tickDecimals : 0,
      tickFormatter : function(v) {
        return v + " .jan";
      }
    },
    yaxis : {
      tickFormatter : function(v) {
        return v + " kg";
      }
    }
  };
  percentageChartOptions = {
    xaxis : {
      tickDecimals : 0,
      tickFormatter : function(v) {
        return v + " .jan";
      }
    },
    yaxis : {
      tickFormatter : function(v) {
        return v + " %";
      }
    }
  };

  radardatafetched: boolean;
  foodname: string = "Food Item"
  getFoodItem(id){
    this.radardatafetched = false;
    let url = this.apiRoot + `api/FoodItem/${id}`;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          if(data){
            this.foodname = data.name;
            this.radardata.datasets = [];
            let item =
              {
              "label": data.name,
              "backgroundColor": "rgba(151,187,205,0.2)",
              "borderColor": "rgba(151,187,205,1)",
              "pointBackgroundColor": "rgba(151,187,205,1)",
              "pointBorderColor": "#fff",
              "pointHoverBackgroundColor": "#fff",
              "pointHoverBorderColor": "rgba(151,187,205,1)",
              "data": [data.carbohydrate, data.colestrol, data.fat, data.saturatedFat, data.fiber, data.protein, data.water, data.kcal]
            }
            this.radardata.datasets.push(item)
  
            this.radardatafetched = true;
          }
        })
  }

   radardata={
      "labels": ["carbohydrate", "colestrol", "fat", "saturatedFat", "fiber", "protein", "water", "kcal"],
      "datasets": [] = []
   };

}
