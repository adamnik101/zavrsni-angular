import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { restrictAuthorizedGuard } from './restrict-authorized.guard';

describe('restrictAuthorizedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => restrictAuthorizedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
