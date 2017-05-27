import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramNewComponent } from './training-program-new.component';

describe('TrainingProgramNewComponent', () => {
  let component: TrainingProgramNewComponent;
  let fixture: ComponentFixture<TrainingProgramNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProgramNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgramNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
