import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeInfoModalComponent } from './trainee-info-modal.component';

describe('TraineeInfoModalComponent', () => {
  let component: TraineeInfoModalComponent;
  let fixture: ComponentFixture<TraineeInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
