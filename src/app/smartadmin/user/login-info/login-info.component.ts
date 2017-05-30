import {Component, OnInit, Input} from '@angular/core';
import {LayoutService} from "../../layout/layout.service";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  @Input() user;

  constructor(
    private layoutService: LayoutService
  ) {}
  
  ngOnInit() {
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
