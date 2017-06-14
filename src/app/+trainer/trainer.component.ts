import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [ TrainerService, ExerciseService ]
})
export class TrainerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
