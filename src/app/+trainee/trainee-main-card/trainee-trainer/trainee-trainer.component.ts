import { MiscService } from './../../../services/misc.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-trainer',
  templateUrl: './trainee-trainer.component.html',
  styleUrls: ['./trainee-trainer.component.css']
})
export class TraineeTrainerComponent implements OnInit {

  constructor(
    private miscService: MiscService
  ) { }

  trainer: any;
  ngOnInit() {
    let TRID = JSON.parse(localStorage.getItem('user')).trainer_TRID;
    this.miscService.getTrainerCard(TRID)
      .then( data => {
        this.trainer = data;
    });
  }

}
