import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';

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

  getAllFields(cookie: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      environment.getAllFieldsOfEduUrl,
      'GET',
      cookie
    )();
  }

  getOneField(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      environment.getOneFieldOfEduUrl + `/${id}`,
      'GET',
      cookie
    )();
  }

  deleteOneField(cookie: string, id: string): Promise<Response> {
    return this.requestTemplate.bind(
      this,
      environment.deleteOneFieldOfEduUrl + `/${id}`,
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

    return fetch(environment.createOneFieldUrl, options);
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

    return fetch(environment.getOneFieldByParamUrl, options);
  }
}
