import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/services/authentication-service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthenticationService);

  return authService.isAuthenticated();
};
