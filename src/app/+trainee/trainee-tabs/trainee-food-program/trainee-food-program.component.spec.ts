import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeFoodProgramComponent } from './trainee-food-program.component';

describe('TraineeFoodProgramComponent', () => {
  let component: TraineeFoodProgramComponent;
  let fixture: ComponentFixture<TraineeFoodProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeFoodProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeFoodProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
