import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';

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
      environment.verifyAdminTokenUrl,
      cookie
    )();
  }

  verifyNormalCookie(cookie: string): Promise<Response> {
    return this.verifyCookie.bind(
      this,
      environment.verifyNormalCookieUrl,
      cookie
    )();
  }
}
