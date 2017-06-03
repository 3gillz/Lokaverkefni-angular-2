import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeMainCardComponent } from './trainee-main-card.component';

describe('TraineeMainCardComponent', () => {
  let component: TraineeMainCardComponent;
  let fixture: ComponentFixture<TraineeMainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeMainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
