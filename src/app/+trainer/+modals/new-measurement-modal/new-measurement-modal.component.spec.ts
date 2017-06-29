import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasurementModalComponent } from './new-measurement-modal.component';

describe('NewMeasurementModalComponent', () => {
  let component: NewMeasurementModalComponent;
  let fixture: ComponentFixture<NewMeasurementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeasurementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeasurementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
