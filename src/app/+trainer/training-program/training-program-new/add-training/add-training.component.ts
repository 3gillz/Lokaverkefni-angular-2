import { ExerciseService } from './../../../exercise.service';
import { CalendarTraining } from './../../../../models/training';
import { I18nService } from './../../../../smartadmin/i18n/i18n.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingProgramService } from '../../training-program.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {

  public activeColorClass: any;
  public addTrainingForm: FormGroup;
  timeOfDay: any;
  dow: number[] = [];
  langSetting: any;
  title: string;
  public exerciseList: any;

  constructor(
    private trainingProgramService: TrainingProgramService,
    private exerciseService: ExerciseService,
    private i18nService: I18nService
  ) {
    this.i18nService.calendarLang.subscribe((calendarLang) => {
      this.langSetting = calendarLang;
    });
    this.exerciseService.getExercises()
      .then((data) => {
        this.exerciseList = data;
        this.title = this.exerciseList[0].name;
      });
    this.addTrainingForm = new FormGroup({
      reps: new FormControl(''),
      sets: new FormControl(''),
      duration: new FormControl(''),
      rest: new FormControl(''),
      dow: new FormControl('')
    });
  }

  ngOnInit() {
    if(this.langSetting == 'is'){
       this.dowCheckbox.push(this.dowCheckbox.shift());
    }
    this.activeColorClass = this.colorClassNames[0];
  }
  setColorClass(colorClassName) {
    this.activeColorClass = colorClassName
  }
  exerciseChange(index: number) {
    this.title = this.exerciseList[index].name;
  }
  checkTrainingEvent(index: number, addEventForm) {
    if(this.dow.length > 0){
      if (addEventForm.reps || addEventForm.sets || addEventForm.duration) {
        this.addTrainingEvent(index, addEventForm);
        this.resetDowCheckbox();
      }
    }
  }

  addTrainingEvent(index: number, addTrainingForm) {
    let timeOfDay = null;
    let event = new CalendarTraining(
      this.trainingProgramService.generateId(),
      this.exerciseList[index].EID,
      this.title,
      this.activeColorClass.bg + ' ' + this.activeColorClass.txt,
      this.dow,
      timeOfDay,
      addTrainingForm.reps ? addTrainingForm.reps : null,
      addTrainingForm.sets ? addTrainingForm.sets : null,
      addTrainingForm.duration ? addTrainingForm.duration : null,
      addTrainingForm.rest ? addTrainingForm.rest : null
    );
    this.trainingProgramService.addEvent(event);

    this.addTrainingForm.reset();
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
      bg: 'bg-color-darken',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-blue',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-orange',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-greenLight',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-blueLight',
      txt: 'txt-color-white'
    },
    {
      bg: 'bg-color-red',
      txt: 'txt-color-white'
    }
  ];
}
/*
bg-color-redLight
bg-color-blueDark
bg-color-green
bg-color-greenDark
bg-color-yellow
bg-color-orangeDark
bg-color-pink
bg-color-pinkDark
bg-color-purple
bg-color-lighten
bg-color-white
bg-color-grayDark
bg-color-magenta
bg-color-teal
*/