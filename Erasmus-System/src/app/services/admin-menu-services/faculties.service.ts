import { Injectable } from '@angular/core';
import { facultyEnvironment } from 'src/app/shared/environments/apiEnvironment';
import { environment } from 'src/app/shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacultiesService {
  constructor() {}

  async createOne(
    cookie: string,
    data: { name: string; coordinator: string }
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(facultyEnvironment.createOneUrl, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async updateOne(
    cookie: string,
    data: { name: string; coordinator: string },
    id: string
  ): Promise<Response> {
    const options = {
      method: 'PATCH',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(facultyEnvironment.updateOneUrl + `/${id}`, options).then(
      (res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      }
    );
  }

  async deleteOne(cookie: string, id: string): Promise<Response> {
    const options = {
      method: 'DELETE',
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    return fetch(facultyEnvironment.deleteOneUrl + `/${id}`, options).then(
      (res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      }
    );
  }
}
