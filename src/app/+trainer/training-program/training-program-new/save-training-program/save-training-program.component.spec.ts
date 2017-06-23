import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTrainingProgramComponent } from './save-training-program.component';

describe('SaveTrainingProgramComponent', () => {
  let component: SaveTrainingProgramComponent;
  let fixture: ComponentFixture<SaveTrainingProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTrainingProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTrainingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
