import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/general-services/auth.service';
import { environment } from '../environments/environment';
import { userRoutes } from '../environments/siteRoutingEnvironment';

export const loggedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    router.navigate([userRoutes.login]);
    return false;
  }

  try {
    const response = await authService.verifyCookie(cookie);
    const { isAuthenticated } = await response.json();

    if (!isAuthenticated) {
      router.navigate([userRoutes.login]);
    }
    return isAuthenticated;
  } catch (err) {
    return false;
  }
};
