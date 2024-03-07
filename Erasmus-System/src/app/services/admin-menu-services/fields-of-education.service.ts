import { Injectable } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { fieldsEnvironment } from '../../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class FieldsOfEducationService {
  constructor() {}

  //template for requests to bind
  private async requestTemplate(
    url: string,
    method: string,
    cookie: string
  ): Promise<Response> {
    const options = {
      method,
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async createOne(
    cookie: string,
    data: { name: string; code: string }
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(fieldsEnvironment.createOneUrl, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async updateOne(
    cookie: string,
    data: { code: string; name: string },
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

    return fetch(fieldsEnvironment.updateOneById + `/${id}`, options).then(
      (res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      }
    );
  }

  async deleteOne(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      fieldsEnvironment.deleteOneUrl + `/${id}`,
      'DELETE',
      cookie
    )();
  }

  async getOne(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      fieldsEnvironment.getOneByIdUrl + `/${id}`,
      'POST',
      cookie
    )();
  } // unused
}
