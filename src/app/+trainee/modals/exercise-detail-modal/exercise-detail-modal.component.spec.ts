import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailModalComponent } from './exercise-detail-modal.component';

describe('ExerciseDetailModalComponent', () => {
  let component: ExerciseDetailModalComponent;
  let fixture: ComponentFixture<ExerciseDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
