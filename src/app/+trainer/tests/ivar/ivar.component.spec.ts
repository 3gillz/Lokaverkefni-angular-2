import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvarComponent } from './ivar.component';

describe('IvarComponent', () => {
  let component: IvarComponent;
  let fixture: ComponentFixture<IvarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
