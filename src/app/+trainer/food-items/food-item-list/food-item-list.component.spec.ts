import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemListComponent } from './food-item-list.component';

describe('FoodItemListComponent', () => {
  let component: FoodItemListComponent;
  let fixture: ComponentFixture<FoodItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
