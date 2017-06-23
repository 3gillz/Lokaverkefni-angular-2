import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTraineeComponent } from './register-trainee.component';

describe('RegisterTraineeComponent', () => {
  let component: RegisterTraineeComponent;
  let fixture: ComponentFixture<RegisterTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
