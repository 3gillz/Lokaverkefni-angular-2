import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageInfoCardComponent } from './landing-page-info-card.component';

describe('LandingPageInfoCardComponent', () => {
  let component: LandingPageInfoCardComponent;
  let fixture: ComponentFixture<LandingPageInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
