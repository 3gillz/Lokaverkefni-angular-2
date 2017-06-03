import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../trainee.service';

@Component({
  selector: 'app-trainee-main-card',
  templateUrl: './trainee-main-card.component.html',
  styleUrls: ['./trainee-main-card.component.css']
})
export class TraineeMainCardComponent implements OnInit {

  constructor(
      public traineeService: TraineeService
  ) { }

  date: any;
  ngOnInit() {
    this.date = new Date();
  }
  
}
