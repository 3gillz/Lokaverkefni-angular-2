import { CustomerService } from './../../customer.service';
import { FoodProgramService } from './../../../services/food-program.service';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-assign-foodprogram-modal',
  templateUrl: './assign-foodprogram-modal.component.html',
  styleUrls: ['./assign-foodprogram-modal.component.css']
})
export class AssignFoodprogramModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private foodProgramService: FoodProgramService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event) {
    if(event.target.id === "assignfood"){
      this.customerService.assignNewFoodgprogram(event.target.value)
      .then((data)=>{
        if(data){
          this.close.emit();
        }
      });
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
                <td><button id="assignfood" value="${d.FPMID}" class="btn btn-xs btn-success">Assign</button></td>
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

