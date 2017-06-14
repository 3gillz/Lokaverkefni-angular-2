import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingProgramService } from './../training-program.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-training-program-view',
  templateUrl: './training-program-view.component.html',
  styleUrls: ['./training-program-view.component.css']
})
export class TrainingProgramViewComponent implements OnInit {

  constructor(
    private trainingProgramService: TrainingProgramService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  id: number;
  private sub: any;
  
  goBack(){
    this.location.back();
  }
  
  ngOnInit() {
    this.trainingProgramService.trainingEvents = [];
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.trainingProgramService.getTrainingProgramByTPID(this.id);
    });
  }
}
