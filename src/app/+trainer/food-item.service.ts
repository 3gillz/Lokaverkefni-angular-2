import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopUpService } from "../services/popup.service";
import { Router } from '@angular/router';

@Injectable()
export class FoodItemService {

public foodItemForm: FormGroup;

  constructor(
 @Inject("apiRoot") private apiRoot,
    private popUpService: PopUpService,
    private http: Http,
    private router: Router
  ) {
    this.foodItemForm = new FormGroup({
      name: new FormControl('', <any>Validators.required),
      category: new FormControl('', <any>Validators.required),
      carbs: new FormControl('', <any>Validators.required),
      protein: new FormControl('', <any>Validators.required),
      saturatedFat: new FormControl('', <any>Validators.required),
      unsaturatedFat: new FormControl('', <any>Validators.required),
      fiber: new FormControl('', <any>Validators.required),
      fat: new FormControl('', <any>Validators.required),
      kcal: new FormControl('', <any>Validators.required),
      water: new FormControl('', <any>Validators.required),
      colestrol: new FormControl('', <any>Validators.required),
      addedSugar: new FormControl('', <any>Validators.required),
    });
  }

    addNewFoodItem(foodItemForm): Promise<boolean>{
    let optionalBody = '';
    for (let x = 1; x < Object.keys(foodItemForm).length; x++) {
      let value = (<any>Object).values(foodItemForm)[x];
      if (value !== null && value !== "") {
        optionalBody += `&${Object.keys(foodItemForm)[x]}=${value}`;
      }
    }
    let body = `name=${foodItemForm.name}` + optionalBody;
    let url = this.apiRoot + "api/FoodItem/TrainerAdd";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          resolve(data);
          data === true ? this.popUpService.successMessage("FoodItem added", "Just now") : this.popUpService.errorMessage("Sorry, something went wrong");
        })
    });
  }

}
