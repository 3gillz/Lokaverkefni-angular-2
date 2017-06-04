import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise-video-modal',
  templateUrl: './exercise-video-modal.component.html',
  styleUrls: ['./exercise-video-modal.component.css']
})
export class ExerciseVideoModalComponent implements OnInit {

  constructor() { }

  loadtime: boolean = false;
  @Input() videoUrl;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit() {
    setTimeout(() => {
      this.loadtime = true;
    }, 2500);
  }

  closeModal(){
    this.close.emit();
  }

}
