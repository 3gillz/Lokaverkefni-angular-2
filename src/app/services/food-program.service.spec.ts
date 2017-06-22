import { TestBed, inject } from '@angular/core/testing';

import { FoodProgramService } from './food-program.service';

describe('FoodProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodProgramService]
    });
  });

  it('should ...', inject([FoodProgramService], (service: FoodProgramService) => {
    expect(service).toBeTruthy();
  }));
});
