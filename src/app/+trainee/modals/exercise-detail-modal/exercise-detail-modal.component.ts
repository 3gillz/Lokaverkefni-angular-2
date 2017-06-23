import { MiscService } from './../../../services/misc.service';
import { SafeUrl } from '@angular/platform-browser';
import { ExerciseService } from './../../../services/exercise.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.component.html',
  styleUrls: ['./exercise-detail-modal.component.css']
})
export class ExerciseDetailModalComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  playVideo: boolean;
  videoUrl: SafeUrl;
  loading: boolean;

  constructor(
    private exerciseService: ExerciseService,
    private miscService: MiscService 
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
    setTimeout(() => {
      this.playVideo = false;
    }, 500);
  }

  showVideo(link){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    },  2500);
    let code = link.split('=');
    this.videoUrl = this.miscService.sanitizeYouTubeUrl(code[1]);
    this.playVideo = true;
  }

}
