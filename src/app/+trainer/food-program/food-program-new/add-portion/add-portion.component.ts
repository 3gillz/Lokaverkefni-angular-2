import { I18nService } from './../../../../smartadmin/i18n/i18n.service';
import { FoodProgramService } from './../../../../services/food-program.service';
import { CalendarFoodPortion, FoodItem, FoodPortionSum } from './../../../../models/footitem';
import { MiscService } from './../../../../services/misc.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-add-portion',
  templateUrl: './add-portion.component.html',
  styleUrls: ['./add-portion.component.css']
})
export class AddPortionComponent implements OnInit {

  public activeColorClass: any;
  public addPortionForm: FormGroup;
  foodItemList: FoodItem[];
  langSetting: any;
  dow: number[] = [];
  selectedItem: FoodItem;

  submitted: boolean;
  noDays: boolean;

  constructor(
    private miscService: MiscService,
    private foodProgramService: FoodProgramService,
    private i18nService: I18nService
  ) { 
    this.i18nService.calendarLang.subscribe((calendarLang) => {
      this.langSetting = calendarLang;
    });
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
        this.foodItemList = data as FoodItem[];
        this.selectedItem = this.foodItemList[0];
      })
  }

  setColorClass(colorClassName) {
    this.activeColorClass = colorClassName
  }

  foodItemChange(index: number){
    this.selectedItem = this.foodItemList[index];
  }

  checkFoodPortionEvent(index: number, addPortionForm) {
    this.submitted = true;
    if(this.dow.length == 0){
      this.noDays = true;
      return;
    } 
    this.noDays = false;       
    if (addPortionForm.grams) {
      this.addFoodPortionEvent(index, addPortionForm.grams);
      this.resetDowCheckbox();
      this.submitted = false;
    }
    
  }

  addFoodPortionEvent(index: number, grams) {
    let timeOfDay = null;
    let tod=  $('#time').val();
    let pid = this.foodProgramService.generateStringId();
    let event = new CalendarFoodPortion(
      this.foodProgramService.generateId(),
      this.foodItemList[index].FIID,
      pid,
      this.selectedItem.name,
      this.activeColorClass.bg + ' ' + this.activeColorClass.txt,
      grams,
      tod,
      this.selectedItem.kcal * (grams /100),
      this.dow
    );
    this.foodProgramService.addEvent(event);
    this.foodProgramService.addToFoodSumArray(this.selectedItem, this.dow.length, grams, pid);
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
