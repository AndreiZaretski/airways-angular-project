import { TestBed } from '@angular/core/testing';

import { PassengersGuard } from './passengers-guard.guard';

describe('PassengersGuardGuard', () => {
  let guard: PassengersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PassengersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
