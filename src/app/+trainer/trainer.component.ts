import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  providers: [ TrainerService ]
})
export class TrainerComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
