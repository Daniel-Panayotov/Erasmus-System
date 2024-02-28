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
import { AdminService } from 'src/app/admins/admin.service';
import { Observable, from, map } from 'rxjs';

export const AdminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const cookieService = inject(CookieService);
  const adminService = inject(AdminService);
  const router = inject(Router);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    return false;
  }

  try {
    const response = await adminService.verifyAdminCookie(cookie);
    const data = await response.json();
    const isAdmin = data.isAdmin;

    return isAdmin;
  } catch (err) {
    return false;
  }
};
