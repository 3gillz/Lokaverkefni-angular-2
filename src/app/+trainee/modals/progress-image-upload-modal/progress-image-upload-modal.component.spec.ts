import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressImageUploadModalComponent } from './progress-image-upload-modal.component';

describe('ProgressImageUploadModalComponent', () => {
  let component: ProgressImageUploadModalComponent;
  let fixture: ComponentFixture<ProgressImageUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressImageUploadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressImageUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
