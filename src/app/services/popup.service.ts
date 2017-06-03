import { Injectable, Inject } from '@angular/core';
import { NotificationService } from "../smartadmin/utils/notification.service";
import { I18nService } from '../smartadmin/i18n/i18n.service';

@Injectable()
export class PopUpService {
    
    constructor(
        private notificationService: NotificationService,
        private i18nService: I18nService
    ){}

  updateInfoSuccess(title) {
    let titleText: string = this.i18nService.getTranslation(title);
    let contentText: string = this.i18nService.getTranslation("Just now");    
    this.notificationService.smallBox({
      title: titleText,
      content: "<i class='fa fa-clock-o'></i> <i>"+contentText+"...</i>",
      color: "#296191",
      iconSmall: "fa fa-thumbs-up bounce animated",
      timeout: 4000
    });
  }
  errorMessage() {
    let titleText: string = this.i18nService.getTranslation("Sorry something went wrong");      
    this.notificationService.smallBox({
      title: titleText,
      color: "#C46A69",
      iconSmall: "fa fa-thumbs-down bounce animated",
      timeout: 4000
    });
  }
  
}