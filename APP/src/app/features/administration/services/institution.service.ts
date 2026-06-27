import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { InstitutionBase, InstitutionData, SaveInstitution } from '../models/institution.model';
import { take } from 'rxjs';
import { Parameter } from '../../../shared/models/parameter.model';

@Service()
export class InstitutionService {
  private http = inject(HttpClient);

  public GetOne(InstitutionID: number) {
    const url = `Institutions/get-one?InstitutionID=${InstitutionID}`;

    return this.http
      .get<InstitutionBase>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetAll(parameters: Parameter<InstitutionBase>[]) {
    const url = `Institutions/get-all`;

    return this.http
      .post<InstitutionBase[]>(url, parameters, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(body: SaveInstitution) {
    const url = `Institutions/create`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Update(InstitutionID: number, body: InstitutionData) {
    const url = `Institutions/update?InstitutionID=${InstitutionID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Delete(InstitutionID: number) {
    const url = `Institutions/delete?InstitutionID=${InstitutionID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
