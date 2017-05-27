import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProgramListComponent } from './food-program-list.component';

describe('FoodProgramListComponent', () => {
  let component: FoodProgramListComponent;
  let fixture: ComponentFixture<FoodProgramListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProgramListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
