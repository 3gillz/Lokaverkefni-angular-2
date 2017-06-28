import { FoodProgram } from './../models/foodProgram';
import { Router } from '@angular/router';
import { PopUpService } from './popup.service';
import { CalendarFoodPortion, FoodItem, FoodPortionSum, FoodPortionDTO } from './../models/footitem';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject, Subscription } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FoodProgramService {


  public foodPortionEvents: Array<CalendarFoodPortion> = [];
  public eventAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  foodSumArray: FoodPortionSum[] = [];
  nutritionSum : FoodPortionSum;

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private popUpService: PopUpService,
    private router: Router
  ) { }

  addEvent(event) {
    const dropId = event.id;
    event.id = this.id;
    this.foodPortionEvents.push(event);
    this.eventAdded.next(true);
  }

  viewFoodProgram(FPMID: number) {
    this.router.navigate(['trainer/foodprograms/' + FPMID ]);
  }

  foodProgramLoaded: boolean;
  getFoodProgramListByTRID(){
    let url = this.apiRoot + "api/FoodProgram/GetAllByTRID";
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
  foodProgramName: String;
  getFoodProgramByTPID(TPID: number){
    this.foodProgramLoaded = false;        
    let url = this.apiRoot + "api/FoodProgram/"+ TPID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(
          response => {
            if(response){
              response as FoodProgram;
              this.foodProgramName = response.name;
              this.getPortionsInProgram(response.FPMID);
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
  getPortionsInProgram(TPMID: number){
    let url = this.apiRoot + "api/FoodPortion/Get/"+ TPMID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(
          data => { 
            this.prepTrainingsForCalendar(data as FoodPortionDTO);
          }
        )
    });
  }

  prepTrainingsForCalendar(portions){
    this.foodPortionEvents = [];
    for(let x = 0; x < portions.length; x++){
      let portion = new CalendarFoodPortion(
        this.generateId(),
        portions[x].foodItem_FIID,
        this.generateStringId(),
        portions[x].name,
        portions[x].className,
        portions[x].quantity,
        portions[x].start,
        portions[x].kcal,
        this.getDow(portions[x])     
      );
      this.foodPortionEvents.push(portion);
    }
    this.eventAdded.next(true);
    this.foodProgramLoaded = true;
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
  

  removeEvent(event){
    this.foodPortionEvents.splice(this.foodPortionEvents.findIndex(it => it.id == event.id), 1);
    this.removeFromSumArray(event)
  }
  generateStringId() {
    return Math.random().toString(36).slice(2)
  }

  removeFromSumArray(event: any){
    var newarray = this.foodSumArray.filter(e => e.fid != event.fid);
    this.foodSumArray = newarray;
    this.calculateNutritionInProgram();
  }

  addToFoodSumArray(foodItem: FoodItem, days: number,  grams: number, pid){
    for(let x = 0; x < days; x++){
      let item = new FoodPortionSum(
        this.generateId(),
        pid,
        foodItem.carbohydrate,
        foodItem.colestrol,
        foodItem.fat,
        foodItem.fiber,
        foodItem.kcal,
        foodItem.protein,
        foodItem.saturatedFat,
        foodItem.unsaturatedFat,
        foodItem.water,
        foodItem.addedSugar,
        grams,
      );
      this.foodSumArray.push(item);
    }
    this.calculateNutritionInProgram();
  }

  calculateNutritionInProgram(){
    let carbohydrateSum = 0; let colestrolSum = 0;
    let fatcSum = 0; let fiberSum = 0; let kcalSum = 0;
    let proteinSum = 0; let saturatedFatSum = 0; let unsaturatedFatSum = 0; 
    let waterSum = 0; let addedSugarSum = 0; let grams = 0;
    let y = this.foodSumArray.length;
    for(let x = 0; x < this.foodSumArray.length; x++){
        let gramCalc = (this.foodSumArray[x].grams / 100);
        carbohydrateSum += this.foodSumArray[x].carbohydrateSum * gramCalc;
        colestrolSum += this.foodSumArray[x].colestrolSum * gramCalc;
        fatcSum += this.foodSumArray[x].fatSum * gramCalc;
        fiberSum += this.foodSumArray[x].fiberSum * gramCalc;
        kcalSum += this.foodSumArray[x].kcalSum * gramCalc;
        proteinSum += this.foodSumArray[x].proteinSum * gramCalc;
        saturatedFatSum += this.foodSumArray[x].saturatedFatSum * gramCalc;
        unsaturatedFatSum += this.foodSumArray[x].unsaturatedFatSum * gramCalc;
        waterSum += this.foodSumArray[x].waterSum * gramCalc;
        addedSugarSum += this.foodSumArray[x].addedSugarSum * gramCalc;
        grams += this.foodSumArray[x].grams;
    };
    let nutritionSum = new FoodPortionSum(
      1,
      "Sum",
      carbohydrateSum,
      colestrolSum,
      fatcSum,
      fiberSum,
      kcalSum,
      proteinSum,
      saturatedFatSum,
      unsaturatedFatSum,
      waterSum,
      addedSugarSum,
      grams,
      kcalSum / 7,
    );
    this.nutritionSum = nutritionSum;
    console.log(nutritionSum);
    console.log(this.nutritionSum)
  }

  createFoodProgram(name){
    let url = this.apiRoot + "api/FoodProgram/Add";
    let body = `name=${name}`;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise(() => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          let FPID = data;
          this.prepFoodPortionsForDb(FPID, name);
        })
    });
  }

  prepFoodPortionsForDb(FPID: number, name){
    let dtoArray: FoodPortionDTO[] = [];
     for(let x = 0; x < this.foodPortionEvents.length; x++){
       let portion = new FoodPortionDTO(
         this.foodPortionEvents[x].id,
         this.foodPortionEvents[x].quantity,
         this.foodPortionEvents[x].foodItem_FIID,
         this.foodPortionEvents[x].dow.some(x => x == 0) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 1) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 2) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 3) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 4) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 5) ? true : false,
         this.foodPortionEvents[x].dow.some(x => x == 6) ? true : false,
         this.foodPortionEvents[x].className,
         this.foodPortionEvents[x].start
       );
      dtoArray.push(portion);
    }
    this.createPortions(dtoArray, FPID, name)
  }
  createPortions(dtoArray: FoodPortionDTO[], FPID: number, name){ 
    let body = "=" + JSON.stringify(dtoArray);
    let url = this.apiRoot + "api/FoodPortion/Add/" + FPID;
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body , requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          if(data = true){
            this.createFoodProgramSuccess(FPID);
          }
          else if(data = false){
            this.popUpService.errorMessage("Sorry, something went wrong");
          }
        })
    });
  }
  createFoodProgramSuccess(TPID: number){
    this.popUpService.successMessage("Training Program Created", "Just now");
    if (localStorage.getItem('tempFoodProgram')) {
      localStorage.removeItem('tempFoodProgram')
    }
    this.foodPortionEvents = [];
    this.viewFoodProgram(TPID);
  }



  startingId(): number{
    if (localStorage.getItem('tempFoodProgram')) {
      let arr = JSON.parse(localStorage.getItem('tempFoodProgram'));
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


}
