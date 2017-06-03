import { Component, OnInit } from '@angular/core';
import { TraineeService } from './trainee.service';
import { TraineePopUpService } from "./trainee-popup.service";

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService, TraineePopUpService ]
})
export class TraineeComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
