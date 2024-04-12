import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import {
  cookieEnvironment,
  getAuthRoute,
} from 'src/app/shared/environments/apiEnvironment';
import { environment } from 'src/app/shared/environments/environment';
import {
  authActionString,
  authSectionString,
} from 'src/app/types/apiEnvironmentTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CookieService);

  private jwt: string = this.cookieService.get(environment.authCookieName);
  private cookieSubject$ = new BehaviorSubject(this.jwt);

  setJwtCookie(cookie: string): void {
    this.cookieService.set(environment.authCookieName, cookie, undefined, '/');

    this.cookieSubject$.next(cookie);
  }

  deleteJwtCookie(): void {
    this.cookieService.delete(environment.authCookieName, '/');

    this.cookieSubject$.next('');
  }

  async authenticate(
    authModule: authSectionString,
    action: authActionString,
    data: {
      email: string;
      password: string;
    }
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    /* Get url and send request
     */
    const url = getAuthRoute(authModule, action);

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async verifyCookie(cookie: string): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
    };

    return fetch(cookieEnvironment.verifyCookieUrl, options).then((res) => {
      if (!res.ok) {
        throw res;
      }

      return res;
    });
  }

  get authCookieSubject$(): BehaviorSubject<string> {
    return this.cookieSubject$;
  }
}
