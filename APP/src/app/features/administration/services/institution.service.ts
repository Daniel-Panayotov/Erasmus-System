import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Institution, InstitutionBase, SaveInstitution } from '../models/institution.model';
import { take } from 'rxjs';
import { InstitutionParameter } from '../../../shared/models/parameter.model';

@Service()
export class InstitutionService {
  private http = inject(HttpClient);

  public GetOne(InstitutionID: number) {
    const url = `Institutions/get-one?InstitutionID=${InstitutionID}`;

    return this.http
      .get<Institution>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetAll(queryParams: InstitutionParameter[]) {
    let url = `Institutions/get-all`;

    if (queryParams.length > 0)
      url += '?' + queryParams.map((p) => `${p.field}=${p.value}`).join('&');

    return this.http
      .get<InstitutionBase[]>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(body: SaveInstitution) {
    const url = `Institutions/create`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Update(InstitutionID: number, body: SaveInstitution) {
    const url = `Institutions/update?InstitutionID=${InstitutionID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Delete(InstitutionID: number) {
    const url = `Institutions/delete?InstitutionID=${InstitutionID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
