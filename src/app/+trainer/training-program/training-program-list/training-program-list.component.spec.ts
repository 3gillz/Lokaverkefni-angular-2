import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramListComponent } from './training-program-list.component';

describe('TrainingProgramListComponent', () => {
  let component: TrainingProgramListComponent;
  let fixture: ComponentFixture<TrainingProgramListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProgramListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
