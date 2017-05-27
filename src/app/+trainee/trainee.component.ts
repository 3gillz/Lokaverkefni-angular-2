import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {

  constructor() { }

  date: any;
  ngOnInit() {
    this.date = new Date();
  }

}
