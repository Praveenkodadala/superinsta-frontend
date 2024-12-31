import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authLoginGuardGuard } from './auth-login-guard.guard';

describe('authLoginGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authLoginGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
