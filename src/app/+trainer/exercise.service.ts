import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../services/popup.service";
import { Router } from '@angular/router';

@Injectable()
export class ExerciseService {

  public exerciseForm: FormGroup;
  public editExercise: any;

  constructor(
    @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http,
    private router: Router
  ) {
    this.exerciseForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      link: new FormControl('', <any>Validators.required),
      type: new FormControl('', <any>Validators.required),
      description: new FormControl('', <any>Validators.required)
    });
  }

  getExercises(){
    let url = this.apiRoot + "api/Exercise/GetAllByTrid";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        })
    });
  }
  addNewExercise(exerciseForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(exerciseForm).length; x++) {
      let value = (<any>Object).values(exerciseForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(exerciseForm)[x]}=${(<any>Object).values(exerciseForm)[x]}`;
      }
    }
    let body = `name=${exerciseForm.name}` + optionalBody;
    let url = this.apiRoot + "api/Exercise/TrainerAdd";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.successMessage("Exercise added", "Just now") : this.popUpService.errorMessage("Sorry, something went wrong");
        })
    });
  }
  getExerciseForEdit(id: number){
    let url = this.apiRoot + "api/Exercise/" + id;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    this.http.get(url, requestOptions)
      .map(res => res.json())
      .subscribe((data) => {
        this.editExercise = data;
        this.router.navigate([ 'trainer/exercise/edit/' + id ]);
      })
  }
  updateExercise(exerciseForm: any){
    let body = `eid=${this.editExercise.EID}&name=${exerciseForm.name}&link=${exerciseForm.link}&type=${exerciseForm.type}&description=${exerciseForm.description}`;    
    let url = this.apiRoot + "api/Exercise/UpdateWithTRID";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.updateExerciseSuccess() : this.popUpService.errorMessage("Sorry, something went wrong");
        })
    });
  }
  updateExerciseSuccess(){
    this.popUpService.successMessage("Exercise updated",  "Just now");
    this.router.navigate([ 'trainer/exercise/list' ]);    
  }
  
}
