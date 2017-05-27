import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgillComponent } from './egill.component';

describe('EgillComponent', () => {
  let component: EgillComponent;
  let fixture: ComponentFixture<EgillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
