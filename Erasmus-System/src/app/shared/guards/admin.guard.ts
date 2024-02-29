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
import { Observable, from, map } from 'rxjs';
import { VerifyCookieService } from 'src/app/services/verify-cookie.service';

export const AdminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const cookieService = inject(CookieService);
  const verifyCookieService = inject(VerifyCookieService);
  const router = inject(Router);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    return false;
  }

  try {
    const response = await verifyCookieService.verifyAdminCookie(cookie);
    const data = await response.json();
    const isAdmin = data.isAdmin;

    return isAdmin;
  } catch (err) {
    return false;
  }
};
