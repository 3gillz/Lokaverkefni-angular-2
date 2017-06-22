import { FoodProgramService } from './../../../../services/food-program.service';
import { CalendarFoodPortion } from './../../../../models/footitem';
import { MiscService } from './../../../../services/misc.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-portion',
  templateUrl: './add-portion.component.html',
  styleUrls: ['./add-portion.component.css']
})
export class AddPortionComponent implements OnInit {

  public activeColorClass: any;
  public addPortionForm: FormGroup;
  foodItemList: any;
  langSetting: any;
  dow: number[] = [];
  title: string;
  submitted: boolean;
  noDays: boolean;

  constructor(
    private miscService: MiscService,
    private foodProgramService: FoodProgramService
  ) { 
    this.addPortionForm = new FormGroup({
      grams: new FormControl('', <any>Validators.required),
      timeOfDay: new FormControl(''),
      dow: new FormControl('')
    });
  }


  ngOnInit() {
    if(this.langSetting == 'is'){
       this.dowCheckbox.push(this.dowCheckbox.shift());
    }
    this.activeColorClass = this.colorClassNames[0];
    this.miscService.getFoodItems()
      .then(data =>{
        this.foodItemList = data;
        this.title = this.foodItemList[0].name;
      })
  }

  setColorClass(colorClassName) {
    this.activeColorClass = colorClassName
  }

  foodItemChange(index: number){
    this.title = this.foodItemList[index].name;
  }

  checkTrainingEvent(index: number, addPortionForm) {
    this.submitted = true;
    if(this.dow.length == 0){
      this.noDays = true;
      return;
    }    
    this.noDays = false;       
    if (addPortionForm.grams) {
      this.addFoodPortionEvent(index, addPortionForm);
      this.resetDowCheckbox();
      this.submitted = false;
    }
    
  }

  addFoodPortionEvent(index: number, addPortionForm) {
    let timeOfDay = null;
    let event = new CalendarFoodPortion(
      this.foodProgramService.generateId(),
      this.title,
      this.activeColorClass.bg + ' ' + this.activeColorClass.txt,
      addPortionForm.grams,
      addPortionForm.timeOfDay,
      this.dow
    );
    this.foodProgramService.addEvent(event);
    this.addPortionForm.reset();
    this.dow = [];
  }

  updateDowCheckbox(value, event) {
    if (event.target.checked) {
      this.dow.push(value);
    }
    else if (!event.target.checked) {
      let indexx = this.dow.indexOf(value);
      this.dow.splice(indexx, 1);
    }
  }
  resetDowCheckbox() {
    for (let x = 0; x < this.dowCheckbox.length; x++) {
      this.dowCheckbox[x].checked = false;
    }
  }
  dowCheckbox = [
    { value: 0, id: 'weekday-sun', name: "Sun", checked: false },
    { value: 1, id: 'weekday-mon', name: "Mon", checked: false },
    { value: 2, id: 'weekday-tue', name: "Tue", checked: false },
    { value: 3, id: 'weekday-wed', name: "Wed", checked: false },
    { value: 4, id: 'weekday-thu', name: "Thu", checked: false },
    { value: 5, id: 'weekday-fri', name: "Fri", checked: false },
    { value: 6, id: 'weekday-sat', name: "Sat", checked: false }
  ]
  public colorClassNames: Array<any> = [
    {
      bg: 'bg-color-greenDark',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-orangeDark',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-pinkDark',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-grayDark',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-teal',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-magenta',
      txt: 'txt-color-white'
    }
  ];

}
