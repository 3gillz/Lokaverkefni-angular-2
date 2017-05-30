import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../smartadmin/utils/notification.service";

@Component({
  selector: 'app-larus',
  templateUrl: './larus.component.html',
  styleUrls: ['./larus.component.css']
})
export class LarusComponent implements OnInit {

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  modal(){
    this.notificationService.smallBox({
      title: "James Simmons liked your comment",
      content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
      color: "#296191",
      iconSmall: "fa fa-thumbs-up bounce animated",
      timeout: 4000
    });
  }
  
  modal2() {
    this.notificationService.bigBox({
      title: "Big Information box",
      content: "This message will dissapear in 6 seconds!",
      color: "#C46A69",
      //timeout: 6000,
      icon: "fa fa-warning shake animated",
      number: "1",
      timeout: 6000
    });
  }

  smartModEg1() {
    this.notificationService.smartMessageBox({
      title: "Smart Alert!",
      content: "This is a confirmation box. Can be programmed for button callback",
      buttons: '[No][Yes]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {

        this.notificationService.smallBox({
          title: "Callback function",
          content: "<i class='fa fa-clock-o'></i> <i>You pressed Yes...</i>",
          color: "#659265",
          iconSmall: "fa fa-check fa-2x fadeInRight animated",
          timeout: 4000
        });
      }
      if (ButtonPressed === "No") {
        this.notificationService.smallBox({
          title: "Callback function",
          content: "<i class='fa fa-clock-o'></i> <i>You pressed No...</i>",
          color: "#C46A69",
          iconSmall: "fa fa-times fa-2x fadeInRight animated",
          timeout: 4000
        });
      }

    });
  }

}
