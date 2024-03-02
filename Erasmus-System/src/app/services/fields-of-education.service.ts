import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { fieldsEnvironment } from '../shared/environments/apiEnvironment';

@Injectable({
  providedIn: 'root',
})
export class FieldsOfEducationService {
  constructor() {}

  //template for requests to bind
  private requestTemplate(
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

    return fetch(url, options);
  }

  getAllForPage(cookie: string, page: number): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      fieldsEnvironment.getAllForPageUrl + `/${page}`,
      'GET',
      cookie
    )();
  }

  getOneField(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      fieldsEnvironment.getOneByIdUrl + `/${id}`,
      'GET',
      cookie
    )();
  }

  deleteOneField(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      fieldsEnvironment.deleteOneUrl + `/${id}`,
      'DELETE',
      cookie
    )();
  }

  // not binded
  addOneField(
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

    return fetch(fieldsEnvironment.createOneUrl, options);
  }

  getOneByParam(
    cookie: string,
    data: { select: string; search: string }
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(fieldsEnvironment.getOneByParamUrl, options);
  }

  updateOne(
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

    return fetch(fieldsEnvironment.updateOneById + `/${id}`, options);
  }
}
