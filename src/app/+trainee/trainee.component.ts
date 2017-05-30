import { Component, OnInit } from '@angular/core';
import { TraineeService } from './trainee.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService ]
})
export class TraineeComponent implements OnInit {

  constructor() { }

  date: any;
  user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.date = new Date();
  }

}
