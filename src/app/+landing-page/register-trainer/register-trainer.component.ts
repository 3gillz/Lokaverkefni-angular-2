import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.css']
})
export class RegisterTrainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  termsAgreed(){
    $('#terms').prop('checked', true);
  }

}
