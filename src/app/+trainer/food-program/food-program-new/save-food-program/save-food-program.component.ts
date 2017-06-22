import { FoodProgramService } from './../../../../services/food-program.service';
import { PopUpService } from './../../../../services/popup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-food-program',
  templateUrl: './save-food-program.component.html',
  styleUrls: ['./save-food-program.component.css']
})
export class SaveFoodProgramComponent implements OnInit {

  constructor(
    private foodProgramService: FoodProgramService,
    private popUpService: PopUpService
  ) { }

  ngOnInit() {
  }
  saveTrainingProgram(name) {
    if (this.foodProgramService.foodPortionEvents.length == 0) {
      this.popUpService.infoMessage("Cannot save food program.", "Food program is empty.");
      return;
    }
    if (!name.value) {
      this.popUpService.infoMessage("Cannot save food program.", "Please enter a program name.");
      return;
    } else {
      this.popUpService.promtWithButtons("Save program?", "Programs cannot be edited once saved.", ["Edit More", "Save"])
        .then((data) => {
          if (data == "Save" || data == "Vista") {
            console.log("vista hér")
          }
        })
    }
  }

}