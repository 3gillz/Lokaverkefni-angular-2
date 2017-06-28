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
    if (sessionStorage.getItem('tempFoodProgram')) {
      this.foodProgramService.foodPortionEvents =  JSON.parse(sessionStorage.getItem('tempFoodProgram'));
    }
  }
  
  ngOnDestroy() {
    if(this.foodProgramService.foodPortionEvents.length > 0){
      sessionStorage.setItem('tempFoodProgram', JSON.stringify(this.foodProgramService.foodPortionEvents))
    }else{
      if(sessionStorage.getItem('tempFoodProgram')){
        sessionStorage.removeItem('tempFoodProgram');
      }
    }

  }
}
