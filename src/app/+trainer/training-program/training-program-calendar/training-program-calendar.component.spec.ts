import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramCalendarComponent } from './training-program-calendar.component';

describe('TrainingProgramCalendarComponent', () => {
  let component: TrainingProgramCalendarComponent;
  let fixture: ComponentFixture<TrainingProgramCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProgramCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgramCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
