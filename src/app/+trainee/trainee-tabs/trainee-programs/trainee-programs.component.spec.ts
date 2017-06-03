import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeProgramsComponent } from './trainee-programs.component';

describe('TraineeProgramsComponent', () => {
  let component: TraineeProgramsComponent;
  let fixture: ComponentFixture<TraineeProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
