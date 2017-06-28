import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";
import { AccountService } from '../../../services/account.service';
import { I18nService } from '../../i18n/i18n.service';

declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService,
              private accountService: AccountService,
              private i18nService: I18nService
              ) {

               }
  showPopup(){
    let contentText: string = this.i18nService.getTranslation("Are you sure you want to log out?");
    let titleText: string = this.i18nService.getTranslation("Logout");
    let yes: string = this.i18nService.getTranslation("Yes");
    let no: string = this.i18nService.getTranslation("No");
    this.notificationService.smartMessageBox({
      title : "<i class='fa fa-sign-out txt-color-orangeDark'></i>"+titleText+"<span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : contentText,
      buttons : '['+no+']['+yes+']'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Yes" || ButtonPressed == "Já") {
        this.logout()
      }
    });
  }

  logout(){
      this.accountService.logout();
  }

  ngOnInit() {

  }



}
