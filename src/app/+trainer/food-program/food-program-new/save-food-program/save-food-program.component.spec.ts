import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFoodProgramComponent } from './save-food-program.component';

describe('SaveFoodProgramComponent', () => {
  let component: SaveFoodProgramComponent;
  let fixture: ComponentFixture<SaveFoodProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFoodProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFoodProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
