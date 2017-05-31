import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

import { TraineeService } from './trainee.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService ]
})
export class TraineeComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(
    public traineeService: TraineeService
  ) { }
  
  date: any;
  user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.date = new Date();
  }

  submit(model: any, isValid: boolean) {
    console.log("sub")
    console.log(model);
    console.log(isValid);
    this.traineeService.submit(model, isValid);
  }

}
