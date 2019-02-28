import { TestBed, inject } from '@angular/core/testing';

import { YnabApiService } from './ynab-api.service';

describe('YnabApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YnabApiService]
    });
  });

  it('should be created', inject([YnabApiService], (service: YnabApiService) => {
    expect(service).toBeTruthy();
  }));
});
