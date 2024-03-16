import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { AuthService } from 'src/app/services/general-services/auth.service';
import { home } from '../environments/siteRoutingEnvironment';

export const notLoggedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    return true;
  }

  try {
    const response = await authService.verifyCookie(cookie);
    const data = await response.json();

    const { isAuthenticated } = data;
    if (isAuthenticated) {
      router.navigate([home]);
    }
    return !isAuthenticated;
  } catch (err) {
    return false;
  }
};
