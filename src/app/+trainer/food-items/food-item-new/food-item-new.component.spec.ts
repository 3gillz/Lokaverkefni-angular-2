import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemNewComponent } from './food-item-new.component';

describe('FoodItemNewComponent', () => {
  let component: FoodItemNewComponent;
  let fixture: ComponentFixture<FoodItemNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
