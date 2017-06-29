import { MiscService } from './../../services/misc.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-register-trainee',
  templateUrl: './register-trainee.component.html',
  styleUrls: ['./register-trainee.component.css']
})
export class RegisterTraineeComponent implements OnInit {

  trainer: any;
  agreedValue: boolean = false;

  constructor(
    @Inject("apiRoot") private apiRoot,
    private activatedRoute: ActivatedRoute,
    private miscService: MiscService,
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      +params['id'];
        this.miscService.getTrainerCard(+params['id'])
          .then( data => {
            this.trainer = data;
            if(!this.trainer){
              this.router.navigate(['/login'])
            }
          });
    });
  }
  termsAgreed(){
    this.agreedValue = !this.agreedValue;
    $('#terms').prop('checked', true);
  }

}
