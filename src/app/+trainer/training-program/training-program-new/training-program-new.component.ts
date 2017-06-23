import { PopUpService } from './../../../services/popup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingProgramService } from '../../../services/training-program.service';

@Component({
  selector: 'app-training-program-new',
  templateUrl: './training-program-new.component.html',
  styleUrls: ['./training-program-new.component.css']
})
export class TrainingProgramNewComponent implements OnInit {

  constructor(
    private trainingProgramService: TrainingProgramService,
    private popUpService: PopUpService
  ) { }

  ngOnInit() {
    this.trainingProgramService.trainingEvents = [];
    if (localStorage.getItem('tempProgram')) {
      this.trainingProgramService.trainingEvents =  JSON.parse(localStorage.getItem('tempProgram'));
    }
  }
  ngOnDestroy() {
    if(this.trainingProgramService.trainingEvents.length > 0){
      this.popUpService.promtWithButtons("Store program?", "Do you want to store program in session?", ["No", "Yes"])
        .then((data) => {
          if (data == "Yes" || data == "Já") {
            localStorage.setItem('tempProgram', JSON.stringify(this.trainingProgramService.trainingEvents))
          }
          if(data == "No" || data == "Nei"){
            if (localStorage.getItem('tempProgram')) {
              localStorage.removeItem('tempProgram');
            }
          }
        })
    }
  }

}
