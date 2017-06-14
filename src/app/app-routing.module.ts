import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './+landing-page/landing-page.component';
import { LoginComponent } from './+landing-page/login/login.component';
import { RegisterComponent } from './+landing-page/register/register.component';

import { TraineeComponent } from './+trainee/trainee.component';

import { TrainerComponent } from './+trainer/trainer.component';
import { DashboardComponent } from './+trainer/dashboard/dashboard.component';
import { CustomerComponent } from './+trainer/customer/customer.component';
import { CustomerListComponent } from './+trainer/customer/customer-list/customer-list.component';
import { NewCustomerComponent } from './+trainer/customer/new-customer/new-customer.component';
import { CustomerDetailComponent } from './+trainer/customer/customer-detail/customer-detail.component';

import { TrainingProgramComponent } from './+trainer/training-program/training-program.component';
import { TrainingProgramListComponent } from './+trainer/training-program/training-program-list/training-program-list.component';
import { TrainingProgramNewComponent } from './+trainer/training-program/training-program-new/training-program-new.component';
import { TrainingProgramViewComponent } from './+trainer/training-program/training-program-view/training-program-view.component';
import { FoodProgramComponent } from './+trainer/food-program/food-program.component';
import { FoodProgramNewComponent } from './+trainer/food-program/food-program-new/food-program-new.component';
import { FoodProgramListComponent } from './+trainer/food-program/food-program-list/food-program-list.component';
import { FoodItemsComponent } from './+trainer/food-items/food-items.component';
import { FoodItemNewComponent } from './+trainer/food-items/food-item-new/food-item-new.component';
import { FoodItemListComponent } from './+trainer/food-items/food-item-list/food-item-list.component';
import { ExerciseComponent } from './+trainer/exercise/exercise.component';
import { ExerciseListComponent } from './+trainer/exercise/exercise-list/exercise-list.component';
import { ExerciseNewComponent } from './+trainer/exercise/exercise-new/exercise-new.component';
import { ExerciseEditComponent } from './+trainer/exercise/exercise-edit/exercise-edit.component';

import { TestsComponent } from './+trainer/tests/tests.component';
import { LarusComponent } from './+trainer/tests/larus/larus.component';
import { IvarComponent } from './+trainer/tests/ivar/ivar.component';
import { EgillComponent } from './+trainer/tests/egill/egill.component';
import { DavidComponent } from './+trainer/tests/david/david.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'profile', //View subscribed programs and measurement data
    component: TraineeComponent
  },
  {
    path: 'trainer', //Trainer Admin page. Customer, Data, Programs etc.
    component: TrainerComponent,
    children:[
      {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'dashboard', component: DashboardComponent },
      {path: 'customers', component: CustomerComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: CustomerListComponent},
          {path: 'new', component: NewCustomerComponent},
          {path: 'detail/:id', component: CustomerDetailComponent}
        ]
      },
      {path: 'trainingprograms', component: TrainingProgramComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: TrainingProgramListComponent},
          {path: 'new', component: TrainingProgramNewComponent},
          {path: ':id', component: TrainingProgramViewComponent}
        ]
      },
      {path: 'exercise', component: ExerciseComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: ExerciseListComponent},
          {path: 'new', component: ExerciseNewComponent},
          {path: 'edit/:id', component: ExerciseEditComponent}
        ]
      },
      {path: 'foodprograms', component: FoodProgramComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: FoodProgramListComponent},
          {path: 'new', component: FoodProgramNewComponent}
        ]
      },
      {path: 'fooditems', component: FoodItemsComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: FoodItemListComponent},
          {path: 'new', component: FoodItemNewComponent}
        ]
      },
      {path: 'test', component: TestsComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'larus', component: LarusComponent},
          {path: 'ivar', component: IvarComponent},
          {path: 'egill', component: EgillComponent},
          {path: 'david', component: DavidComponent}
        ]
      }
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutedComponents = [
  LandingPageComponent,
  LoginComponent,
  RegisterComponent,
  TraineeComponent,
  TrainerComponent,
  DashboardComponent,
  CustomerComponent,
  CustomerListComponent,
  NewCustomerComponent,
  CustomerDetailComponent,
  TrainingProgramComponent,
  TrainingProgramListComponent,
  TrainingProgramNewComponent,
  TrainingProgramViewComponent,
  ExerciseComponent,
  ExerciseListComponent,
  ExerciseNewComponent,
  ExerciseEditComponent,
  FoodProgramComponent,
  FoodProgramListComponent,
  FoodProgramNewComponent,
  FoodItemsComponent,
  FoodItemListComponent,
  FoodItemNewComponent,
  //Test
  TestsComponent,
  LarusComponent,
  IvarComponent,
  EgillComponent,
  DavidComponent
]