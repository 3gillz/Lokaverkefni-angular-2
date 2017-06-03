import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeProfileImageModalComponent } from './trainee-profile-image-modal.component';

describe('TraineeProfileImageModalComponent', () => {
  let component: TraineeProfileImageModalComponent;
  let fixture: ComponentFixture<TraineeProfileImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeProfileImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeProfileImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
