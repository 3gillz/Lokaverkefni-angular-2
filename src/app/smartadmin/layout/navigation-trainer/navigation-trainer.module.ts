

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {I18nModule} from "../../i18n/i18n.module";
import {MinifyMenuComponent} from "./minify-menu.component";
import {NavigationTrainerComponent} from "./navigation-trainer.component";
import {SmartMenuDirective} from "./smart-menu.directive";
import {UserModule} from "../../user/user.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UserModule
  ],
  declarations: [
    NavigationTrainerComponent,
    MinifyMenuComponent,
    SmartMenuDirective,
  ],
  exports: [
    MinifyMenuComponent,
    NavigationTrainerComponent,
    SmartMenuDirective,
  ]
})
export class NavigationTrainerModule{}
