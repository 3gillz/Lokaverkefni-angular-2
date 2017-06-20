import { PopUpService } from './../../../services/popup.service';
import { TraineeService } from './../../trainee.service';
import { I18nService } from './../../../smartadmin/i18n/i18n.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {DomSanitizer} from '@angular/platform-browser';
declare var $ : any;

@Component({
  selector: 'app-progress-image-upload-modal',
  templateUrl: './progress-image-upload-modal.component.html',
  styleUrls: ['./progress-image-upload-modal.component.css']
})
export class ProgressImageUploadModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
  }
  data:any;
  cropperSettings:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;
   
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
   
  constructor(
    private sanitizer:DomSanitizer,
    private traineeService: TraineeService,
    private popUpService: PopUpService
  ) { 
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 600;
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 20;
    this.cropperSettings.minHeight = 30;
    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.data = {};
  }

  saveProgressImage(){
    let src = $('.cropped-img').attr('src');
    if(!src){
      this.popUpService.errorMessage("No image chosen...");
      return;
    }
    var base64 = src.replace(/^data:image\/[a-z]+;base64,/, "");
    this.traineeService.saveProgressImage(base64)
      .then((data) => {
          if (data) {
            this.traineeService.getProgressImages()
              .then(data => {
                this.traineeService.prepImagesForGallery(data);
              });
            this.closeModal();
            this.popUpService.successMessage("Image added", "Just now");
          }
          if(!data){
            this.popUpService.errorMessage("Sorry something went wrong");
          }
        })
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }
  
  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = (loadEvent:any) => {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
    }
}