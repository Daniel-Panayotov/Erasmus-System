import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { cookieEnvironment } from '../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class VerifyCookieService {
  constructor() {}

  private verifyCookie(url: string, cookie: string): Promise<Response> {
    const options = {
      method: 'GET',
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    return fetch(url, options);
  }

  verifyAdminCookie(cookie: string): Promise<Response> {
    return this.verifyCookie.bind(
      this,
      cookieEnvironment.verifyAdminTokenUrl,
      cookie
    )();
  }

  verifyNormalCookie(cookie: string): Promise<Response> {
    return this.verifyCookie.bind(
      this,
      cookieEnvironment.verifyNormalCookieUrl,
      cookie
    )();
  }
}
