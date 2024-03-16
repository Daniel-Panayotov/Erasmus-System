import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { AuthService } from 'src/app/services/general-services/auth.service';
import { home } from '../environments/siteRoutingEnvironment';

export const AdminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    router.navigate([home]);
    return false;
  }

  try {
    const response = await authService.verifyCookie(cookie);
    const data = await response.json();
    const { isAdmin } = data;

    if (!isAdmin) {
      router.navigate([home]);
    }
    return isAdmin;
  } catch (err) {
    return false;
  }
};
