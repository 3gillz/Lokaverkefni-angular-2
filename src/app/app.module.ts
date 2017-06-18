import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SmartadminGalleryModule } from "./smartadmin/ui/gallery/gallery.module";
import {StatsModule} from "./smartadmin/stats/stats.module";
import {InlineGraphsModule} from "./smartadmin/graphs/inline/inline-graphs.module";
import {SmartadminFormsLiteModule} from "./smartadmin/forms/smartadmin-forms-lite.module";
import { SmartadminValidationModule } from "./smartadmin/forms/validation/smartadmin-validation.module";
import {SmartProgressbarModule} from "./smartadmin/ui/smart-progressbar/smart-progressbar.module";
import { JsonApiService } from './smartadmin/json-api.service';
import { LayoutService } from './smartadmin/layout/layout.service';
import { UserService } from './smartadmin/user/user.service';
import { SoundService } from "./smartadmin/sound/sound.service";
import { SmartadminDatatableModule } from './smartadmin/ui/datatable/smartadmin-datatable.module';
import { MaskedInput } from './smartadmin/forms/input/masked-input.directive'
//SmartAdmin end
import { AccountService } from './services/account.service';
import { MiscService } from './services/misc.service';
import { PopUpService } from "./services/popup.service";
import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//LandingSection
import { LandingPageInfoCardComponent } from './+landing-page/landing-page-info-card/landing-page-info-card.component';
import { TermsModalComponent } from './+landing-page/terms-modal/terms-modal.component';
import { TrainerRegisterFormComponent } from './+landing-page/register-trainer/trainer-register-form/trainer-register-form.component';
import { TraineeRegisterFormComponent } from './+landing-page/register-trainee/trainee-register-form/trainee-register-form.component';
//TraineeSection
import { TraineeMainCardComponent } from './+trainee/trainee-main-card/trainee-main-card.component';
import { TraineeTrainerComponent } from './+trainee/trainee-main-card/trainee-trainer/trainee-trainer.component';
import { TraineeInfoModalComponent } from './+trainee/modals/trainee-info-modal/trainee-info-modal.component';
import { TraineeProfileImageModalComponent } from './+trainee/modals/trainee-profile-image-modal/trainee-profile-image-modal.component';
import { TraineeProgressImagesComponent } from './+trainee/trainee-tabs/trainee-progress-images/trainee-progress-images.component';
import { TraineeProgramsComponent } from './+trainee/trainee-tabs/trainee-programs/trainee-programs.component';
import { TraineeMeasurementsComponent } from './+trainee/trainee-tabs/trainee-measurements/trainee-measurements.component';
//TrainerSection
import { ExerciseVideoModalComponent } from './+trainer/+modals/exercise-video-modal/exercise-video-modal.component';
import { AddTrainingComponent } from './+trainer/training-program/training-program-new/add-training/add-training.component';
import { SaveTrainingProgramComponent } from './+trainer/training-program/training-program-new/save-training-program/save-training-program.component';
import { TrainingProgramCalendarComponent } from './+trainer/training-program/training-program-calendar/training-program-calendar.component';

@NgModule({
  declarations: [
    MaskedInput,
    AppComponent,
    RoutedComponents,
    //LandingPage
    LandingPageInfoCardComponent,
    TermsModalComponent,
    TrainerRegisterFormComponent,
    TraineeRegisterFormComponent,
    //Trainee
    TraineeMainCardComponent,
    TraineeTrainerComponent,
    TraineeInfoModalComponent,
    TraineeProfileImageModalComponent,
    TraineeProgressImagesComponent,
    TraineeProgramsComponent,
    TraineeMeasurementsComponent,
    //Trainer
    ExerciseVideoModalComponent,
    AddTrainingComponent,
    TrainingProgramCalendarComponent,
    SaveTrainingProgramComponent,
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
    SmartadminValidationModule,
    SmartProgressbarModule,
    SmartadminGalleryModule,
    //ngx-bootstrap
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    //SmartAdminEnd
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    AccountService,
    MiscService,
    PopUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
