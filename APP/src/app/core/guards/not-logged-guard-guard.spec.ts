import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notLoggedGuardGuard } from './not-logged-guard-guard';

describe('notLoggedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => notLoggedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
