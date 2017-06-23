import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.css']
})
export class TermsModalComponent implements OnInit {

  @Output() agreed = new EventEmitter();
  @Input() user: string;

  constructor() { }

  title: string;

  ngOnInit() {
    this.title = this.user + " TERMS & CONDITIONS";
  }

  termsAgreed(){
    this.agreed.emit();
  }

}
