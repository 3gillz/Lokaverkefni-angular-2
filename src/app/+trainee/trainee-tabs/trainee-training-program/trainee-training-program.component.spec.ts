import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTrainingProgramComponent } from './trainee-training-program.component';

describe('TraineeTrainingProgramComponent', () => {
  let component: TraineeTrainingProgramComponent;
  let fixture: ComponentFixture<TraineeTrainingProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeTrainingProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTrainingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
