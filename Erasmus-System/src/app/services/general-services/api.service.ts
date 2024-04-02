import { Injectable } from '@angular/core';
import { getRoute } from 'src/app/shared/environments/apiEnvironment';
import { environment } from 'src/app/shared/environments/environment';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getAll(cookie: string, section: adminSectionString) {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    const url = getRoute(section, 'getAll');

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }
}
