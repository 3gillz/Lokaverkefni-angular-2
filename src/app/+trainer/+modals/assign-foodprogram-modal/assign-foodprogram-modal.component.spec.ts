import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFoodprogramModalComponent } from './assign-foodprogram-modal.component';

describe('AssignFoodprogramModalComponent', () => {
  let component: AssignFoodprogramModalComponent;
  let fixture: ComponentFixture<AssignFoodprogramModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFoodprogramModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFoodprogramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
