import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-register-trainee',
  templateUrl: './register-trainee.component.html',
  styleUrls: ['./register-trainee.component.css']
})
export class RegisterTraineeComponent implements OnInit {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private activatedRoute: ActivatedRoute,
    private http: Http
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      +params['id'];
        this.getTrainerCard(+params['id']);
    });
  }
  agreedValue: boolean = false;
  termsAgreed(){
    this.agreedValue = !this.agreedValue;
    $('#terms').prop('checked', true);
  }

  trainer: any;
  getTrainerCard(TRID: number){
    let url = this.apiRoot + "api/Trainer/card/" + TRID;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          this.trainer = data;
        })
    });
  }

}
