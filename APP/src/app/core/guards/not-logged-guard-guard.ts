import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';

export const notLoggedGuardGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) return true;

  return router.createUrlTree(['home']);
};
