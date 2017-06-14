import { TrainingProgramService } from './../training-program.service';
import { TrainerService } from './../../trainer.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-training-program-list',
  templateUrl: './training-program-list.component.html',
  styleUrls: ['./training-program-list.component.css']
})
export class TrainingProgramListComponent implements OnInit {

  constructor(
    private trainingProgramService: TrainingProgramService
  ) { }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event) {
    if(event.target.id === "view"){
      this.trainingProgramService.viewTrainingProgram(event.target.value)
    }
  }

  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.trainingProgramService.getTrainingProgramsByTRID()
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
      {"data": "name"},
      {"data": "difficulty"}
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
                <td><button id="view" value="${d.TPID}" class="btn btn-xs btn-success">View</button></td>
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
