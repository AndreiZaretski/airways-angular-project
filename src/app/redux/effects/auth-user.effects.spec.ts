import { TestBed } from '@angular/core/testing';

import { UserEffects } from './autn-user.effects';

describe('EfectsEffectsService', () => {
  let service: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
