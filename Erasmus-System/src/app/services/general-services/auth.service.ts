import { Injectable } from '@angular/core';
import { getAuthRoute } from 'src/app/shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async authenticate(
    authModule: string,
    action: string,
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
}
