import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  resolved: boolean = true;
  ngOnInit() {
  }
  
  login(email, password){
    this.resolved =false;
    this.accountService.login(email, password)
      .then(response => this.resolved = true )
  }

}
