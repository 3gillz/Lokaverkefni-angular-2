import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.css']
})
export class ExerciseNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  submitExercise(exerciseform, nafn){
    console.log(exerciseform.name);    
    console.log(exerciseform.name.attr);

  }
  public exerciseOptions:any = {
    rules: {
      name: {
        required: true
      },
      link: {
        url: true
      },
      description: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      name: {
        required: 'Please enter name'
      },
      link: {
        url: 'Please enter a VALID url'
      },
      description: {
        required: 'Please enter description'
      }
    }
  };
}
