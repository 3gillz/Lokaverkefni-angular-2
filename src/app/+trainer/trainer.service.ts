import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopUpService } from "../services/popup.service";

@Injectable()
export class TrainerService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http
  ) {}

  addNewExercise(exerciseform): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(exerciseform).length; x++) {
      let value = (<any>Object).values(exerciseform)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(exerciseform)[x]}=${(<any>Object).values(exerciseform)[x]}`;
      }
    }
    let body = `name=${exerciseform.name}` + optionalBody;
    let url = this.apiRoot + "api/Exercise/TrainerAdd";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.updateInfoSuccess("Exercise added") : this.popUpService.errorMessage();
        })
    });
  }

}
