import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTermsModalComponent } from './trainer-terms-modal.component';

describe('TrainerTermsModalComponent', () => {
  let component: TrainerTermsModalComponent;
  let fixture: ComponentFixture<TrainerTermsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerTermsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
