import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './+landing-page/landing-page.component';
import { LoginComponent } from './+landing-page/login/login.component';
import { RegisterComponent } from './+landing-page/register/register.component';

import { TraineeComponent } from './+trainee/trainee.component';

import { TrainerComponent } from './+trainer/trainer.component';
import { DashboardComponent } from './+trainer/dashboard/dashboard.component';

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
      {path: 'dashboard', component: DashboardComponent }
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
  DashboardComponent
]