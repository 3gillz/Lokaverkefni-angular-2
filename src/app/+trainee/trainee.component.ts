import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

import { TraineeService } from './trainee.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService ]
})
export class TraineeComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(
    public traineeService: TraineeService
  ) { }

  invalidImage: boolean;
  date: any;
  ngOnInit() {
    this.date = new Date();
  }

  cancelImageChange(){
    this.traineeService.newProfileImagePath = this.traineeService.user.profileImagePath;
  }
  saveNewImage(newImage){
    this.traineeService.saveProfileImage(newImage.src)
  }

  submit(model: any, isValid: boolean) {
    this.traineeService.submitNewInfo(model, isValid);
  }

}
