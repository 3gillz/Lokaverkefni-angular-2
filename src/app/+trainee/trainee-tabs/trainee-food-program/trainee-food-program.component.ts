import { FoodProgramService } from './../../../services/food-program.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { TraineeService } from './../../trainee.service';
import { I18nService } from '../../../smartadmin/i18n/i18n.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-trainee-food-program',
  templateUrl: './trainee-food-program.component.html',
  styleUrls: ['./trainee-food-program.component.css']
})
export class TraineeFoodProgramComponent implements OnInit {
  private $calendarRef: any;
  private calendar: any;
  private language: any;
  rendered: boolean
  programName: string;

  constructor(
    private i18nService: I18nService,
    private foodProgramService: FoodProgramService,
    private el: ElementRef,
    ) {
    System.import('script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/fullcalendar.min.js').then(()=>{
      this.render()
    })
    this.i18nService.calendarLang.subscribe((calendarLang) => {
      this.language = calendarLang;
    });
    this.foodProgramService.foodeventAdded.subscribe((foodeventAdded) => {
      if(this.rendered){
        this.refetchEvents()
      }
    });
  }

  ngOnInit(){
    this.foodProgramService.getTraineesFoodProgram()
      .then(name => {
        if(name){
          this.programName = name as string 
        }else{
          this.programName = this.i18nService.getTranslation("Not registered in a program");
        }
      });
  }

  render() {

    this.$calendarRef = $('#calendar', this.el.nativeElement);
    this.calendar = this.$calendarRef.fullCalendar({
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
        eventOrder: "id",
        slotEventOverlap: false,
        events: (start, end, timezone, callback) => {
          callback(this.foodProgramService.foodPortionEvents)
        },
        
        eventRender: (event, element) => {
          element.find('.fc-title').append("<br/>" + event.grams + " grams");
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
    this.calendar.fullCalendar('changeView', select.value);
    this.period = select.name
  }

  next() {
    $('.fc-next-button', this.el.nativeElement).click();
  }

  prev() {
    $('.fc-prev-button', this.el.nativeElement).click();
  }

  ngOnDestroy() {
    this.calendar.fullCalendar('destroy');
    this.foodProgramService.foodPortionEvents = [];
  }
  
  refetchEvents(){
      this.calendar.fullCalendar('refetchEvents');
  }
}
