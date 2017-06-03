import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.css']
})
export class ExerciseNewComponent implements OnInit {

  public exerciseForm: FormGroup;
  constructor(
    private trainerService: TrainerService
  ) 
  {
    this.exerciseForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      link: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl('')
    });
   }

  ngOnInit() {
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
