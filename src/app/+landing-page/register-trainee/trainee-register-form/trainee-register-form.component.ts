import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-register-form',
  templateUrl: './trainee-register-form.component.html',
  styleUrls: ['./trainee-register-form.component.css']
})
export class TraineeRegisterFormComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

}
