import { FoodProgramService } from './../../../services/food-program.service';
import { TrainerService } from './../../trainer.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-food-program-list',
  templateUrl: './food-program-list.component.html',
  styleUrls: ['./food-program-list.component.css']
})
export class FoodProgramListComponent implements OnInit {

  constructor(
    private foodProgramService: FoodProgramService
  ) { }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event) {
    if(event.target.id === "view"){
      this.foodProgramService.viewFoodProgram(event.target.value)
    }
  }

  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.foodProgramService.getFoodProgramListByTRID()
        .catch(this.handleError)
        .then((data) => {
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
      {"data": "name"}
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
                <td>Action:</td>
                <td><button id="view" value="${d.FPMID}" class="btn btn-xs btn-success">View</button></td>
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
  
}
