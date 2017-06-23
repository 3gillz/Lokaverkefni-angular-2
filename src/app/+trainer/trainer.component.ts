import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { ExerciseService } from './exercise.service';
import { FoodItemService } from './food-item.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [ TrainerService, ExerciseService, FoodItemService, CustomerService ]
})
export class TrainerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
