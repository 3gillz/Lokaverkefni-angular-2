import { Component, OnInit } from '@angular/core';
import { TraineeService } from './trainee.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService ]
})
export class TraineeComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
