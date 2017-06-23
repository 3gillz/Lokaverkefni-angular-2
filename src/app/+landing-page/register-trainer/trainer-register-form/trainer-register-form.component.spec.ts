import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRegisterFormComponent } from './trainer-register-form.component';

describe('TrainerRegisterFormComponent', () => {
  let component: TrainerRegisterFormComponent;
  let fixture: ComponentFixture<TrainerRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
