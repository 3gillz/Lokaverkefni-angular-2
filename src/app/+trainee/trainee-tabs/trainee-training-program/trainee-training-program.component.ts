import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ExerciseService } from './../../../services/exercise.service';
import { TrainingProgramService } from './../../../services/training-program.service';
import { TraineeService } from './../../trainee.service';
import { I18nService } from '../../../smartadmin/i18n/i18n.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-trainee-training-program',
  templateUrl: './trainee-training-program.component.html',
  styleUrls: ['./trainee-training-program.component.css']
})
export class TraineeTrainingProgramComponent implements OnInit {
  private $calendarRef: any;
  private trainingcalendar: any;
  private language: any;
  rendered: boolean
  programName: string;

  constructor(
    private i18nService: I18nService,
    private trainingProgramService: TrainingProgramService,
    private exerciseService: ExerciseService,
    private el: ElementRef,
    ) {
    System.import('script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/fullcalendar.min.js').then(()=>{
      this.render()
    })
    this.i18nService.calendarLang.subscribe((calendarLang) => {
      this.language = calendarLang;
    });
    this.trainingProgramService.eventAdded.subscribe((eventAdded) => {
      if(this.rendered){
        this.refetchEvents()
      }
    });
  }

  ngOnInit(){
    this.trainingProgramService.getTraineesTrainingProgram()
      .then(name => {
        if(name){
          this.programName = name as string 
        }else{
          this.programName = this.i18nService.getTranslation("Not registered in a program");
        }
      });
  }

  render() {

    this.$calendarRef = $('#trainingcalendar', this.el.nativeElement);
    this.trainingcalendar = this.$calendarRef.fullCalendar({
        lang: this.language,
        editable: false,
        draggable: false,
        selectable: false,
        unselectAuto: false,
        disableResizing: false,
        droppable: false,
        eventLimit: false,
        defaultView: 'basicDay',
        displayEventTime: false,
        aspectRatio: 2.5,
        columnFormat: {
          week: 'dddd',
          day: 'dddd'
        },
        eventClick: (event) => {
            this.exerciseService.getExerciseByEID(event.exercise_EID);
            $('#exerciseModal-button').click();
        },
        eventOrder: "id",
        slotEventOverlap: false,
        events: (start, end, timezone, callback) => {
          callback(this.trainingProgramService.trainingEvents)
        },
        eventRender: (event, element) => {
          if (event.reps != null) {
            element.find('.fc-title').append("<br/>" + event.reps + " reps");
          }
          if (event.sets != null) {
            element.find('.fc-title').append("<br/>" + event.sets + " sets");
          }
          if (event.duration != null) {
            element.find('.fc-title').append("<br/>" + event.duration + " min");
          }
          if (event.rest != null) {
            element.find('.fc-title').append("<br/>rest " + event.rest + " min");
          }
          if (event.allDay == false) {
            element.find('.fc-title').append("<br/>Time: " + event.start.format('HH:mm'));
          }
        }
      }
    );
    $('.fc-toolbar').hide();
    this.rendered = true
  }

  public period = 'Day'
  viewSelect =[
    {name: "Week", value:"basicWeek"},
    {name: "Day", value:"basicDay"}
  ]
  changeView(select) {
    this.trainingcalendar.fullCalendar('changeView', select.value);
    this.period = select.name
  }

  next() {
    $('.fc-next-button', this.el.nativeElement).click();
  }

  prev() {
    $('.fc-prev-button', this.el.nativeElement).click();
  }

  ngOnDestroy() {
    this.trainingcalendar.fullCalendar('destroy');
    this.trainingProgramService.trainingEvents = [];
  }
  
  refetchEvents(){
      this.trainingcalendar.fullCalendar( 'refetchEvents' );
  }
}
