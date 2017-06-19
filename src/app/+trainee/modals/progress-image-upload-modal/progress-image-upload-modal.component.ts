import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
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
   
  constructor() { 
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
  
  testImagePath: any;

  test(){
    var str = $('.cropped-img').attr('src');
    var base64 = str.replace(/^data:image\/\w+;base64,/, "");
    console.log("length: " + base64.length)
    console.log(base64.length % 4 == 0 ? true : false)
    //this.testImagePath = str;
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
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
    }
}