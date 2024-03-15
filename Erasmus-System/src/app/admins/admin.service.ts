import { Injectable } from '@angular/core';
import { adminsEnvironment } from '../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  async loginAdmin(data: {
    email: string;
    password: string;
  }): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(adminsEnvironment.loginUrl, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }
}
