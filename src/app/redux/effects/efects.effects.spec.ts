import { TestBed } from '@angular/core/testing';

import { EfectsEffects } from './efects.effects';

describe('EfectsEffectsService', () => {
  let service: EfectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfectsEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
