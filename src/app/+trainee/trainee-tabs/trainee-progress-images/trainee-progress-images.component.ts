import { TraineeService } from './../../trainee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-progress-images',
  templateUrl: './trainee-progress-images.component.html',
  styleUrls: ['./trainee-progress-images.component.css']
})
export class TraineeProgressImagesComponent implements OnInit {

  constructor(
    private traineeService: TraineeService
  ) { }

  newImage: any;
  ngOnInit() {
    this.traineeService.getProgressImages()
      .then(data => {
        this.traineeService.pushImagesToGallery(data);
      })
  }


  onDelete(picture){
    console.log('GalleryDemoComponent onDelete', picture)
  }
  onEdit(picture){
    console.log('GalleryDemoComponent onEdit', picture)
  }


}
