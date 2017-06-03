import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeMeasurementsComponent } from './trainee-measurements.component';

describe('TraineeMeasurementsComponent', () => {
  let component: TraineeMeasurementsComponent;
  let fixture: ComponentFixture<TraineeMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
