import { TestBed, inject } from '@angular/core/testing';

import { CategoryUpdatorService } from './category-updator.service';

describe('CategoryUpdatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryUpdatorService]
    });
  });

  it('should be created', inject([CategoryUpdatorService], (service: CategoryUpdatorService) => {
    expect(service).toBeTruthy();
  }));
});
