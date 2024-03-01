import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthentificationGuard } from './authentification.guard';

describe('authentificationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AuthentificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
