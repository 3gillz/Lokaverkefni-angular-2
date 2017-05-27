import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProgramNewComponent } from './food-program-new.component';

describe('FoodProgramNewComponent', () => {
  let component: FoodProgramNewComponent;
  let fixture: ComponentFixture<FoodProgramNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodProgramNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodProgramNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
