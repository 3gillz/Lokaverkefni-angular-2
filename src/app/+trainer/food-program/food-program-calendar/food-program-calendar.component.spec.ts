import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProgramCalendarComponent } from './food-program-calendar.component';

describe('FoodProgramCalendarComponent', () => {
  let component: FoodProgramCalendarComponent;
  let fixture: ComponentFixture<FoodProgramCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProgramCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProgramCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
