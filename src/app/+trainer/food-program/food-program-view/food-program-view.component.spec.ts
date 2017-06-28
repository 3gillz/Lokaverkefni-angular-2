import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProgramViewComponent } from './food-program-view.component';

describe('FoodProgramViewComponent', () => {
  let component: FoodProgramViewComponent;
  let fixture: ComponentFixture<FoodProgramViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProgramViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProgramViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
