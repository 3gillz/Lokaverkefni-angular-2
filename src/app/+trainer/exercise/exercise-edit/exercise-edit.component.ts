import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  public exerciseForm: any;
  public exercise: any;

  constructor(
    private trainerService: TrainerService,
    private location: Location
  ) 
  {
    this.exerciseForm = trainerService.exerciseForm;
    this.exercise = trainerService.editExercise;
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
    this.trainerService.updateExercise(exerciseForm.value)
  }
}
