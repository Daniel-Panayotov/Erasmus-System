import { Injectable } from '@angular/core';
import { getRoute } from 'src/app/shared/environments/apiEnvironment';
import { environment } from 'src/app/shared/environments/environment';
import { adminRecords } from 'src/app/types/adminDocs';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';
import { docWithProperties } from 'src/app/types/docProperties';
import { validatedFormValues } from 'src/app/types/popupFormValues';
import { searchValue } from 'src/app/types/searchFormValue';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getAllForRecordType(cookie: string, section: adminSectionString) {
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

  async fetchRefRecords(
    cookie: string,
    docWithProps: docWithProperties
  ): Promise<adminRecords> {
    const records: adminRecords = {};

    //iterate over each property, if ref fetch it
    for (let property in docWithProps) {
      if (!docWithProps[property].isRef) {
        continue;
      }

      const apiSection = docWithProps[property].isRef!.apiSection;

      try {
        const res = await this.getAllForRecordType(cookie, apiSection);
        const { docs } = await res.json();
        records[apiSection] = docs;
      } catch (err) {}
    }

    return records;
  }

  async updateOne(
    cookie: string,
    data: validatedFormValues,
    id: string,
    adminModule: adminSectionString
  ): Promise<Response> {
    const options = {
      method: 'PATCH',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(getRoute(adminModule, 'updateOne') + `/${id}`, options).then(
      (res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      }
    );
  }

  async createOne(
    cookie: string,
    data: validatedFormValues,
    adminModule: adminSectionString
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return fetch(getRoute(adminModule, 'createOne'), options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async getPage(
    cookie: string,
    section: adminSectionString,
    page: number
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
      },
    };

    const url = getRoute(section, 'getPage') + `/${page}`;

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }

  async getPageByParam(
    cookie: string,
    section: adminSectionString,
    page: number,
    searchParams: searchValue
  ): Promise<Response> {
    const options = {
      method: 'POST',
      headers: {
        [environment.authCookieName]: cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    };

    const url = getRoute(section, 'getByParam') + `/${page}`;

    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    });
  }
}
