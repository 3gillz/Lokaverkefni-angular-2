import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.css']
})
export class ExerciseNewComponent implements OnInit {

  public exerciseForm: any;
  constructor(
    private trainerService: TrainerService
  ) 
  {
    this.exerciseForm = trainerService.exerciseForm;
  }

  ngOnInit() {
    this.exerciseForm.reset();
  }

  submitExercise(exerciseForm){
    if(exerciseForm.valid){
      this.trainerService.addNewExercise(exerciseForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.exerciseForm.reset();
        }
      });
    }
  }


}
