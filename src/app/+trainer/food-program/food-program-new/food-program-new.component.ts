import { FoodProgramService } from './../../../services/food-program.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-program-new',
  templateUrl: './food-program-new.component.html',
  styleUrls: ['./food-program-new.component.css']
})
export class FoodProgramNewComponent implements OnInit {


  constructor(
    private foodProgramService: FoodProgramService
  ) { }

  ngOnInit() {
    this.foodProgramService.foodPortionEvents = [];
    if (localStorage.getItem('tempFoodProgram')) {
      this.foodProgramService.foodPortionEvents =  JSON.parse(localStorage.getItem('tempFoodProgram'));
    }
  }
  
  ngOnDestroy() {
    if(this.foodProgramService.foodPortionEvents.length > 0){
      localStorage.setItem('tempFoodProgram', JSON.stringify(this.foodProgramService.foodPortionEvents))
    }

  }
}
