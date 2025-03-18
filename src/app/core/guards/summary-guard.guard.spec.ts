import { TestBed } from '@angular/core/testing';

import { SummaryGuard } from './summary-guard.guard';

describe('SummaryGuardGuard', () => {
  let guard: SummaryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SummaryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
