import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeProgressImagesComponent } from './trainee-progress-images.component';

describe('TraineeProgressImagesComponent', () => {
  let component: TraineeProgressImagesComponent;
  let fixture: ComponentFixture<TraineeProgressImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeProgressImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeProgressImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
