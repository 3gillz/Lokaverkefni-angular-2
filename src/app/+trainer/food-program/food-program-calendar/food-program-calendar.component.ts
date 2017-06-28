import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { FoodProgramService } from './../../../services/food-program.service';
import { I18nService } from './../../../smartadmin/i18n/i18n.service';
declare var $: any;

@Component({
  selector: 'app-food-program-calendar',
  templateUrl: './food-program-calendar.component.html',
  styleUrls: ['./food-program-calendar.component.css']
})
export class FoodProgramCalendarComponent implements OnInit {

  @Input() creationMode: boolean;
  private $calendarRef: any;
  private calendar: any;
  private language: any;
  rendered: boolean;
  closeButton: string = "<button style='background-color:rgba(0,0,0,0)' class='btn btn-xs btn-custom pull-right'><i class='closeon fa fa-close'></i></button>"

  constructor(
    private i18nService: I18nService,
    private el: ElementRef, 
    private foodProgramService: FoodProgramService
    ) {
    System.import('script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/fullcalendar.min.js').then(()=>{
      this.render()
    })
    this.i18nService.calendarLang.subscribe((calendarLang) => {
      this.language = calendarLang;
    });
    this.foodProgramService.foodeventAdded.subscribe((eventAdded) => {
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
        displayEventTime: false,
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
          this.creationMode ? element.find('.fc-content').append( this.closeButton ) : null;
          this.creationMode ? element.find(".closeon").click(() => {
              $('#calendar').fullCalendar('removeEvents', [event._id]);
              this.foodProgramService.removeEvent(event);
            }) : null;
          element.find('.fc-title').append("<br/>" + event.quantity + " " + this.i18nService.getTranslation("grams") );
          //element.find('.fc-title').append("<br/>" + event.kcal.toFixed(0) + " " + this.i18nService.getTranslation("kcal") );
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
