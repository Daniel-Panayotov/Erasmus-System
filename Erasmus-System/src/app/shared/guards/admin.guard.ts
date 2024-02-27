import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authCookieName } from '../constants';
import { AdminService } from 'src/app/admins/admin.service';
import { Observable, from, map } from 'rxjs';

export const AdminGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const cookieService = inject(CookieService);
  const adminService = inject(AdminService);

  const cookie = cookieService.get(authCookieName);

  if (!cookie) {
    // return false;
  }

  try {
    const response = await adminService.verifyAdminCookie(cookie);
    const data = await response.json();
    const isAdmin = data.isAdmin;

    return true;
  } catch (err) {
    return false;
  }
};
