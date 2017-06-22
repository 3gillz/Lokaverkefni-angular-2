import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CalendarTraining, TrainingDTO } from '../models/training';
import { TrainingProgram } from '../models/trainingProgram';
import { PopUpService } from './popup.service';

@Injectable()
export class TrainingProgramService {

  public trainingEvents: Array<CalendarTraining> = [];

  public eventAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private router: Router,
    private popUpService: PopUpService
    ){ }

  addEvent(event) {
    const dropId = event.id;
    event.id = this.id;
    this.trainingEvents.push(event);
    this.eventAdded.next(true);
  }
  removeEvent(event){
    this.trainingEvents.splice(this.trainingEvents.findIndex(it => it.id == event.id), 1);
  }
  startingId(): number{
    if (localStorage.getItem('tempProgram')) {
      let arr = JSON.parse(localStorage.getItem('tempProgram'));
      if(arr.length > 0){
        let idArr: number[] = [];
        for(let x = 0; x < arr.length; x++){
          idArr.push(arr[x].id);
        }
        let max = Math.max.apply(null, idArr);
        return max;
      }
      else{
        return 0;
      }
    }
    else{
      return 0;
    }
  }
  id: number = this.startingId();
  generateId() {
    return this.id++;
  }

  dowCounter: number[] = [];
  getTrainingProgramDifficulty(name){
    for(let x = 0; x < this.trainingEvents.length; x++){
      this.trainingEvents[x].dow.some(x => x == 0) ? this.addToDowCounter(0) : null,
      this.trainingEvents[x].dow.some(x => x == 1) ? this.addToDowCounter(1) : null,
      this.trainingEvents[x].dow.some(x => x == 2) ? this.addToDowCounter(2) : null,
      this.trainingEvents[x].dow.some(x => x == 3) ? this.addToDowCounter(3) : null,
      this.trainingEvents[x].dow.some(x => x == 4) ? this.addToDowCounter(4) : null,
      this.trainingEvents[x].dow.some(x => x == 5) ? this.addToDowCounter(5) : null,
      this.trainingEvents[x].dow.some(x => x == 6) ? this.addToDowCounter(6) : null
    }
    let difficulty = this.calcDifficultyFromDow(); 
    this.createTrainingProgram(name.value, difficulty);
  }
  addToDowCounter(dow: number){
    this.dowCounter.some(x => x == dow ) ? null : this.dowCounter.push(dow);
  }
  calcDifficultyFromDow(): number{
    let length = this.dowCounter.length;
    if(length <= 3){
      return 1;
    }
    if(length > 3 && length <= 5 ){
      return 2
    }else if(length > 5){
      return 3
    }
  }

  createTrainingProgram(name, difficulty){
    let url = this.apiRoot + "api/TrainingProgram/Add";
    let body = `name=${name}&difficulty=${difficulty}`;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          let TPID = data;
          this.prepTrainingsForDb(TPID, name);
        })
    });
  }

  prepTrainingsForDb(TPID: number, name){
    let dtoArray: TrainingDTO[] = [];
    for(let x = 0; x < this.trainingEvents.length; x++){
      let training = new TrainingDTO(
        this.trainingEvents[x].exercise_EID,
        this.trainingEvents[x].className,
        this.trainingEvents[x].dow.some(x => x == 0) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 1) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 2) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 3) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 4) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 5) ? true : false,
        this.trainingEvents[x].dow.some(x => x == 6) ? true : false,
        this.trainingEvents[x].start? this.trainingEvents[x].start : null,
        this.trainingEvents[x].reps ? this.trainingEvents[x].reps : null,
        this.trainingEvents[x].sets ? this.trainingEvents[x].sets : null,
        this.trainingEvents[x].duration ? this.trainingEvents[x].duration : null,
        this.trainingEvents[x].rest ? this.trainingEvents[x].rest : null
      );
      dtoArray.push(training);
    }
    this.createTrainings(dtoArray, TPID, name)
  }
  createTrainings(dtoArray: TrainingDTO[], TPID: number, name){  //Creates Trainings Then populates trainingProgramTraining with TPID and TID
    let body = "=" + JSON.stringify(dtoArray);
    let url = this.apiRoot + "api/Training/Add/" + TPID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body , requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          if(data = true){
            this.createTrainingProgramSuccess(TPID);
          }
          else if(data = false){
            this.popUpService.errorMessage("Sorry, something went wrong");
          }
        })
    });
  }

  createTrainingProgramSuccess(TPID: number){
    this.popUpService.successMessage("Training Program Created", "Just now");
    if (localStorage.getItem('tempProgram')) {
      localStorage.removeItem('tempProgram')
    }
    this.trainingEvents = [];
    this.dowCounter = [];
    this.viewTrainingProgram(TPID);
  }
  trainingProgramLoaded: boolean;
  getTrainingProgramListByTRID(){
    let url = this.apiRoot + "api/TrainingProgram/GetByTRID";
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

  viewTrainingProgram(TPID: number) {
    this.router.navigate(['trainer/trainingprograms/' + TPID ]);
  }

  trainingProgramName: String;
  getTrainingProgramByTPID(TPID: number){
    this.trainingProgramLoaded = false;        
    let url = this.apiRoot + "api/TrainingProgram/"+ TPID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(
          response => {
            if(response){
              response as TrainingProgram;
              this.trainingProgramName = response.name;
              this.getTrainingsInProgram(response.TPID);
            }else{
              this.popUpService.errorMessage("You don't have access to this program");
              setTimeout(() => //Skítamix, let cullCelendar render before navigation// betra að hafa routerGuard?
                this.router.navigate(['trainer/trainingprograms/list'])
              , 250);
            }
          }
        )
    });
  }

  getTraineesTrainingProgram(){
    let url = this.apiRoot + "api/TrainingProgramDate/GetCurrentTrainingProgram";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(
          data => {
            this.getTrainingsInProgram(data.TPID);
            resolve(data.name);
          })
    });
  }

  getTrainingsInProgram(TPID: number){
    let url = this.apiRoot + "api/Training/Get/"+ TPID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(
          data => {           
            this.prepTrainingsForCalendar(data as TrainingDTO);
          }
        )
    });
  }

  prepTrainingsForCalendar(trainings){
    this.trainingEvents = [];
    for(let x = 0; x < trainings.length; x++){
      let training = new CalendarTraining(
        this.generateId(),
        trainings[x].exercise_EID,
        trainings[x].name,
        trainings[x].className,
        this.getDow(trainings[x]),
        trainings[x].timeOfDay,
        trainings[x].numberOfReps,
        trainings[x].numberOfSets,
        trainings[x].durationMin,
        trainings[x].restBetweenMin  
      );
      this.trainingEvents.push(training);
    }
    this.eventAdded.next(true);
    this.trainingProgramLoaded = true;
  }
  getDow(trainings):number[]{
    let dow = [];
    trainings.sunday ? dow.push(0) : null;
    trainings.monday ? dow.push(1) : null;
    trainings.tuesday ? dow.push(2) : null;
    trainings.wednesday ? dow.push(3) : null;
    trainings.thursday ? dow.push(4) : null;
    trainings.friday ? dow.push(5) : null;
    trainings.saturday ? dow.push(6) : null;
    return dow;
  }
  
}
