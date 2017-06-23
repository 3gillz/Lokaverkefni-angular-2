import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { FoodItemService } from './food-item.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [ TrainerService, FoodItemService ]
})
export class TrainerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}