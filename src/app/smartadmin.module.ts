import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

//Smartadmin.module
import {
  ModalModule, ButtonsModule, TooltipModule, BsDropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ngx-bootstrap';
import {PopoverModule} from "ngx-popover";
import {SmartadminLayoutModule} from './smartadmin/layout';
import {I18nModule} from "./smartadmin/i18n/i18n.module";
import {SmartadminWidgetsModule} from "./smartadmin/widgets/smartadmin-widgets.module";
import {UtilsModule} from "./smartadmin/utils/utils.module";
import {UserModule} from "./smartadmin/user/user.module";
import {StatsModule} from "./smartadmin/stats/stats.module";
import {InlineGraphsModule} from "./smartadmin/graphs/inline/inline-graphs.module";
import {SmartadminFormsLiteModule} from "./smartadmin/forms/smartadmin-forms-lite.module";
import {SmartProgressbarModule} from "./smartadmin/ui/smart-progressbar/smart-progressbar.module";
//SmartAdmin Core.module
import { JsonApiService } from './smartadmin/json-api.service';
import { LayoutService } from './smartadmin/layout/layout.service';
import { UserService } from './smartadmin/user/user.service';
import { SoundService } from "./smartadmin/sound/sound.service";

@NgModule({
  imports: [
    SmartadminLayoutModule,
    I18nModule,
    SmartadminWidgetsModule,
    UtilsModule,
    UserModule,
    StatsModule,
    InlineGraphsModule,
    SmartadminFormsLiteModule,
    SmartProgressbarModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    JsonApiService,
    LayoutService,
    UserService,
    SoundService
  ],
    exports: [
    CommonModule,
    ModalModule,
    ButtonsModule,
    AlertModule,
    TabsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,
    PopoverModule,
    SmartadminLayoutModule,
    I18nModule,
    UtilsModule,
    SmartadminFormsLiteModule,
    SmartProgressbarModule,
    InlineGraphsModule,
    SmartadminWidgetsModule,
    StatsModule
  ]
})
export class SmartAdminModule { }
