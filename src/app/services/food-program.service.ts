import { CalendarFoodPortion } from './../models/footitem';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FoodProgramService {


  public foodPortionEvents: Array<CalendarFoodPortion> = [];
  public eventAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  addEvent(event) {
    const dropId = event.id;
    event.id = this.id;
    this.foodPortionEvents.push(event);
    this.eventAdded.next(true);
  }
  removeEvent(event){
    this.foodPortionEvents.splice(this.foodPortionEvents.findIndex(it => it.id == event.id), 1);
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
