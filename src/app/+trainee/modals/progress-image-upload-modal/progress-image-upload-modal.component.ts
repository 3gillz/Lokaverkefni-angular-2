import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-progress-image-upload-modal',
  templateUrl: './progress-image-upload-modal.component.html',
  styleUrls: ['./progress-image-upload-modal.component.css']
})
export class ProgressImageUploadModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  newImagePath: any;
  
  constructor() { }

  ngOnInit() {
  }
  closeModal(){
    this.close.emit();
  }

}
