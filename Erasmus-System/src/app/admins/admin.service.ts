import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { environment } from '../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  loginAdmin(data: { email: string; password: string }): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(environment.loginAdminUrl, options);
  }
}
