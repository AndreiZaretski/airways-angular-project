import { TestBed } from '@angular/core/testing';

import { ResultFlightSumService } from './result-flight-sum.service';

describe('ResultFlightSumService', () => {
  let service: ResultFlightSumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultFlightSumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
