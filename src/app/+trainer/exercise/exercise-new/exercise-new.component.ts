import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.css']
})
export class ExerciseNewComponent implements OnInit {

  public exerciseForm: any;
  submitted: boolean;
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
    this.submitted = true;
    if(exerciseForm.valid){
      this.exerciseService.addNewExercise(exerciseForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.exerciseForm.reset();
          this.submitted = false;
        }
      });
    }
  }


}
