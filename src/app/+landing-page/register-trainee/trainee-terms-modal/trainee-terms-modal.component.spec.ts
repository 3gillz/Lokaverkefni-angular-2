import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTermsModalComponent } from './trainee-terms-modal.component';

describe('TraineeTermsModalComponent', () => {
  let component: TraineeTermsModalComponent;
  let fixture: ComponentFixture<TraineeTermsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeTermsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
