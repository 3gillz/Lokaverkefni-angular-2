import { FoodProgramService } from './../../../services/food-program.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-food-program-view',
  templateUrl: './food-program-view.component.html',
  styleUrls: ['./food-program-view.component.css']
})
export class FoodProgramViewComponent implements OnInit {

  constructor(
    private foodProgramService: FoodProgramService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  id: number;
  private sub: any;
  
  goBack(){
    this.foodProgramService.foodProgramName = null;
    this.location.back();
  }
  
  ngOnInit() {
    this.foodProgramService.foodPortionEvents = [];
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.foodProgramService.getFoodProgramByTPID(this.id);
    });
  }
}
