import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeRegisterFormComponent } from './trainee-register-form.component';

describe('TraineeRegisterFormComponent', () => {
  let component: TraineeRegisterFormComponent;
  let fixture: ComponentFixture<TraineeRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
