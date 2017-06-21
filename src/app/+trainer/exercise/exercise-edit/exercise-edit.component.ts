import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TrainerService } from '../../trainer.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  public exerciseForm: any;
  public exercise: any;

  constructor(
    private exerciseService: ExerciseService,
    private location: Location
  ) 
  {
    this.exerciseForm = exerciseService.exerciseForm;
    this.exercise = exerciseService.currentExercise;
  }

  ngOnInit() {
    if(!this.exercise){
      this.goBack();
    }
  }
  
  goBack(){
    this.location.back();
  }

  updateExercise(exerciseForm){
    this.exerciseService.updateExercise(exerciseForm.value)
  }
}
