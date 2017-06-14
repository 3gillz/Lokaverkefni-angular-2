import { ExerciseService } from './../../exercise.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.css']
})
export class ExerciseNewComponent implements OnInit {

  public exerciseForm: any;
  constructor(
    private exerciseService: ExerciseService
  ) 
  {
    this.exerciseForm = exerciseService.exerciseForm;
  }

  ngOnInit() {
    this.exerciseForm.reset();
  }

  submitExercise(exerciseForm){
    if(exerciseForm.valid){
      this.exerciseService.addNewExercise(exerciseForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.exerciseForm.reset();
        }
      });
    }
  }


}
