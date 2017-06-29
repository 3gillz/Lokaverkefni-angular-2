import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTrainingprogramModalComponent } from './assign-trainingprogram-modal.component';

describe('AssignTrainingprogramModalComponent', () => {
  let component: AssignTrainingprogramModalComponent;
  let fixture: ComponentFixture<AssignTrainingprogramModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTrainingprogramModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTrainingprogramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
