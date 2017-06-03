import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTabsComponent } from './trainee-tabs.component';

describe('TraineeTabsComponent', () => {
  let component: TraineeTabsComponent;
  let fixture: ComponentFixture<TraineeTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
