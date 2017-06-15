import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopUpService } from "../services/popup.service";
import { Router } from '@angular/router';

@Injectable()
export class LandingPageService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http,
    private router: Router
  ) { }
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
          console.log(this.trainer)
        })
    });
  }

}