import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProgramComponent } from './food-program.component';

describe('FoodProgramComponent', () => {
  let component: FoodProgramComponent;
  let fixture: ComponentFixture<FoodProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
