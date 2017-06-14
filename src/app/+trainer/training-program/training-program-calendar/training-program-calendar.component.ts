import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { TrainingProgramService } from '../training-program.service';
import { I18nService } from './../../../smartadmin/i18n/i18n.service';
declare var $: any;

@Component({
  selector: 'app-training-program-calendar',
  templateUrl: './training-program-calendar.component.html',
  styleUrls: ['./training-program-calendar.component.css']
})
export class TrainingProgramCalendarComponent implements OnInit {

  @Input() creationMode: boolean;
  private $calendarRef: any;
  private calendar: any;
  private language: any;
  rendered: boolean;
  closeButton: string = "<button style='background-color:rgba(0,0,0,0)' class='btn btn-xs btn-custom pull-right'><i class='closeon fa fa-close'></i></button>"

  constructor(
    private i18nService: I18nService,
    private el: ElementRef, 
    private trainingProgramService: TrainingProgramService
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
    
  }
  render() {

    this.$calendarRef = $('#calendar', this.el.nativeElement);
    this.calendar = this.$calendarRef.fullCalendar({
        lang: this.language,
        header:false,
        editable: false,
        draggable: false,
        selectable: false,
        unselectAuto: false,
        disableResizing: false,
        droppable: false,
        eventLimit: false,
        defaultView: 'basicWeek',
        axisFormat: 'HH:mm',
        displayEventTime: false,
        minTime: "06:00:00",
        eventClick: (event) => {
            this.creationMode ? console.log(event) : null;
        },
        columnFormat: {
          week: 'dddd',
          day: 'dddd'
        },
        eventOrder: "id",
        slotEventOverlap: false,
        events: (start, end, timezone, callback) => {
          callback(this.trainingProgramService.trainingEvents)
        },
        eventRender: (event, element) => {
          this.creationMode ? element.find('.fc-content').append( this.closeButton ) : null;
          this.creationMode ? element.find(".closeon").click(() => {
              $('#calendar').fullCalendar('removeEvents', [event._id]); //Eyða frá calendarView
              this.trainingProgramService.removeEvent(event); //Eyðafrá trainingEvents Lista
            }) : null;
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
    this.rendered = true;
  }

  ngOnDestroy() {
    this.calendar.fullCalendar('destroy')
  }

  refetchEvents(){
      this.calendar.fullCalendar( 'refetchEvents' );
  }

}
