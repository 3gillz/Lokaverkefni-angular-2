import { TrainingProgramService } from './training-program.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-program',
  template: `<router-outlet></router-outlet>`,
  providers: [ TrainingProgramService ]
})
export class TrainingProgramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
