import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { verifyAdminTokenUrl } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  verifyAdminCookie(cookie: string): Promise<Response> {
    const options = {
      method: 'GET',
      headers: {
        authCookie: cookie,
      },
    };

    return fetch(verifyAdminTokenUrl, options);
  }
}
