import { TestBed } from '@angular/core/testing';

import { GetAirDataService } from './get-air-data.service';

describe('GetAirDataService', () => {
  let service: GetAirDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAirDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
