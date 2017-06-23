import { Injectable, Inject } from '@angular/core';
import { NotificationService } from "../smartadmin/utils/notification.service";
import { I18nService } from '../smartadmin/i18n/i18n.service';

@Injectable()
export class PopUpService {
    
    constructor(
        private notificationService: NotificationService,
        private i18nService: I18nService
    ){}

  successMessage(title: string, content: string) {
    let titleText: string = this.i18nService.getTranslation(title);
    let contentText: string = this.i18nService.getTranslation(content);    
    this.notificationService.smallBox({
      title: titleText,
      content: "<i class='fa fa-clock-o'></i> <i>"+contentText+"...</i>",
      color: "#296191",
      iconSmall: "fa fa-thumbs-up bounce animated",
      timeout: 4000
    });
  }
  errorMessage(title) {
    let titleText: string = this.i18nService.getTranslation(title);      
    this.notificationService.smallBox({
      title: titleText,
      color: "#C46A69",
      iconSmall: "fa fa-thumbs-down bounce animated",
      timeout: 4000
    });
  }
  
  infoMessage(title: string, content: string) {
    let titleText: string = this.i18nService.getTranslation(title);      
    let contentText: string = this.i18nService.getTranslation(content);          
    this.notificationService.smallBox({
      title: titleText,
      content: contentText,
      color: "#C79121",
      timeout: 4000
    });
  }
  
  promtWithButtons(title: string, content: string, buttons: string[]): Promise<string> {
    let titleText: string = this.i18nService.getTranslation(title);      
    let contentText: string = this.i18nService.getTranslation(content);
    let buttonOptions: string;
    for(let x = 0; x < buttons.length; x++){
      let btn: string = this.i18nService.getTranslation(buttons[x]);
      buttonOptions += `[${btn}]`;
    }
    return new Promise((resolve) => {
      this.notificationService.smartMessageBox({
        title: titleText,
        content: contentText,
        buttons: buttonOptions
      }, (ButtonPress) => {
         resolve(ButtonPress);
      });
    });
  }


  
}