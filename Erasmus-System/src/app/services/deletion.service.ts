import { Injectable } from '@angular/core';
import { globalRegex } from '../shared/environments/validationEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../shared/environments/environment';
import { paginationApi } from '../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class DeletionService {
  constructor(private cookieService: CookieService) {}

  async onDelete(
    id: string,
    adminModule: string,
    changePage: any
  ): Promise<void> {
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

      await fetch(
        paginationApi[adminModule]('delete') + `/${id}`,
        options
      ).then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      });

      await changePage();
    } catch (err) {}
  }
}
