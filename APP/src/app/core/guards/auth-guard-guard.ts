import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.authenticated()) return true;

  return router.createUrlTree(['auth', 'login']);
};
