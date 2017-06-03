import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTrainerComponent } from './trainee-trainer.component';

describe('TraineeTrainerComponent', () => {
  let component: TraineeTrainerComponent;
  let fixture: ComponentFixture<TraineeTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
