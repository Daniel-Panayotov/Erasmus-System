import { Injectable, inject } from '@angular/core';
import { globalRegex } from '../shared/environments/validationEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../shared/environments/environment';
import { getRoute } from '../shared/environments/apiEnvironment';
import { apiModuleString } from '../types/apiEnvironmentTypes';

@Injectable({
  providedIn: 'root',
})
export class DeletionService {
  private cookieService = inject(CookieService);

  async onDelete(id: string, adminModule: apiModuleString): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure || !globalRegex.docId.exec(id)) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      const options = {
        method: 'DELETE',
        headers: {
          [environment.authCookieName]: authCookie,
        },
      };

      await fetch(getRoute(adminModule, 'delete') + `/${id}`, options).then(
        (res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        }
      );
    } catch (err) {}
  }
}
