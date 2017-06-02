import { Component, OnInit } from '@angular/core';
import { TraineeService } from './trainee.service';
import { TraineePopUpService } from "./trainee-popup.service";

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
  providers: [ TraineeService, TraineePopUpService ]
})
export class TraineeComponent implements OnInit {

  constructor(
    public traineeService: TraineeService
  ) { }

  validImage: boolean;
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
