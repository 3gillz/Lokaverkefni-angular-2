import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//SmartAdmin start
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
import { ChartJsModule } from "./smartadmin/graphs/chart-js/chart-js.module";
import { MorrisGraphModule } from "./smartadmin/graphs/morris-graph/morris-graph.module";
import { FlotChartModule } from "./smartadmin/graphs/flot-chart/flot-chart.module";
import {StatsModule} from "./smartadmin/stats/stats.module";
import {InlineGraphsModule} from "./smartadmin/graphs/inline/inline-graphs.module";
import {SmartadminFormsLiteModule} from "./smartadmin/forms/smartadmin-forms-lite.module";
import {SmartProgressbarModule} from "./smartadmin/ui/smart-progressbar/smart-progressbar.module";
import { JsonApiService } from './smartadmin/json-api.service';
import { LayoutService } from './smartadmin/layout/layout.service';
import { UserService } from './smartadmin/user/user.service';
import { SoundService } from "./smartadmin/sound/sound.service";
import { SmartadminDatatableModule } from './smartadmin/ui/datatable/smartadmin-datatable.module';
//SmartAdmin end
import { AccountService } from './services/account.service';

import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutedComponents
  ],
  imports: [
    SmartadminLayoutModule,
    SmartadminDatatableModule,
    I18nModule,
    SmartadminWidgetsModule,
    UtilsModule,
    UserModule,
    ChartJsModule,
    MorrisGraphModule,
    FlotChartModule,
    StatsModule,
    InlineGraphsModule,
    SmartadminFormsLiteModule,
    SmartProgressbarModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    //SmartAdminEnd
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    JsonApiService,
    LayoutService,
    UserService,
    SoundService,
    {provide: "apiRoot", useValue: "http://localhost:55322/"},
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
