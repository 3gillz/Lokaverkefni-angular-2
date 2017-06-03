import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TraineeService } from '../../trainee.service';

@Component({
  selector: 'app-trainee-profile-image-modal',
  templateUrl: './trainee-profile-image-modal.component.html',
  styleUrls: ['./trainee-profile-image-modal.component.css']
})
export class TraineeProfileImageModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  validImage: boolean;
  newProfileImagePath: string;

  constructor(
      public traineeService: TraineeService
  ) {
    this.newProfileImagePath = this.traineeService.user.profileImagePath;
   }

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
  }
  cancelImageChange(){
    this.newProfileImagePath = this.traineeService.user.profileImagePath;
  }
  saveNewImage(newImage){
    this.traineeService.saveProfileImage(newImage.src)
  }
}
