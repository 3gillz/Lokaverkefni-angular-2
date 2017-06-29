import { FoodItemService } from './../../food-item.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-food-item-new',
  templateUrl: './food-item-new.component.html',
  styleUrls: ['./food-item-new.component.css']
})
export class FoodItemNewComponent implements OnInit {

public foodItemForm: any;
public submitted: boolean = false;

  constructor(
    private foodItemService: FoodItemService
  ) {
    this.foodItemForm = foodItemService.foodItemForm;
   }

  ngOnInit() {
    this.foodItemForm.reset();
  }

    submitFoodItem(foodItemForm){
      this.submitted = true;
    if(foodItemForm.valid){
      this.foodItemService.addNewFoodItem(foodItemForm.value)
      .then((resolve)=> {
        if(resolve === true){
          this.foodItemForm.reset();
        }
      });
    }
  }

}
