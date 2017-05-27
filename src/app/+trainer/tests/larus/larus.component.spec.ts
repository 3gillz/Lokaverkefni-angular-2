import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LarusComponent } from './larus.component';

describe('LarusComponent', () => {
  let component: LarusComponent;
  let fixture: ComponentFixture<LarusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LarusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LarusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
