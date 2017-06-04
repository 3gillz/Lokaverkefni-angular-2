import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseVideoModalComponent } from './exercise-video-modal.component';

describe('ExerciseVideoModalComponent', () => {
  let component: ExerciseVideoModalComponent;
  let fixture: ComponentFixture<ExerciseVideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseVideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
