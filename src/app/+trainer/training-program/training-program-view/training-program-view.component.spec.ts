import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramViewComponent } from './training-program-view.component';

describe('TrainingProgramViewComponent', () => {
  let component: TrainingProgramViewComponent;
  let fixture: ComponentFixture<TrainingProgramViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProgramViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgramViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
