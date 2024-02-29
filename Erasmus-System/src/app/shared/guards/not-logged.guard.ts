import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { VerifyCookieService } from 'src/app/services/verify-cookie.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

export const notLoggedGuard: CanActivateFn = async (route, state) => {
  const verifyCookieService = inject(VerifyCookieService);
  const cookieService = inject(CookieService);

  const cookie = cookieService.get(environment.authCookieName);

  if (!cookie) {
    return true;
  }

  try {
    const response = await verifyCookieService.verifyNormalCookie(cookie);
    const data = await response.json();

    const isLogged = data.isLogged;
    return !isLogged;
  } catch (err) {
    return true;
  }
};
