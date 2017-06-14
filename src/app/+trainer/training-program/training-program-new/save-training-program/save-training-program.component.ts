import { PopUpService } from './../../../../services/popup.service';
import { TrainingProgramService } from './../../training-program.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-training-program',
  templateUrl: './save-training-program.component.html',
  styleUrls: ['./save-training-program.component.css']
})
export class SaveTrainingProgramComponent implements OnInit {

  constructor(
    private trainingProgramService: TrainingProgramService,
    private popUpService: PopUpService
  ) { }

  ngOnInit() {
  }
  saveTrainingProgram(name) {
    if (this.trainingProgramService.trainingEvents.length == 0) {
      this.popUpService.infoMessage("Cannot save training program.", "Training program is empty.");
      return;
    }
    if (!name.value) {
      this.popUpService.infoMessage("Cannot save training program.", "Please enter a program name.");
      return;
    } else {
      this.popUpService.promtWithButtons("Save program?", "Programs cannot be edited once saved.", ["Edit More", "Save"])
        .then((data) => {
          if (data == "Save" || data == "Vista") {
            this.trainingProgramService.getTrainingProgramDifficulty(name);
          }
        })
    }
  }

}
