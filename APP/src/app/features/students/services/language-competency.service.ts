import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import {
  LanguageCompetencyDTO,
  LanguageCompetencyFormModel,
} from '../models/language-competency.model';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { toFormData } from '../../../shared/utils/formdata-utilities';

@Service()
export class LanguageCompetencyService {
  private http = inject(HttpClient);

  private baseURL = 'language-competencies';

  public certificateUrl = (competencyID: number): string =>
    `${environment.apiUrl}/${this.baseURL}/get-certificate?competencyID=${competencyID}`;

  public GetAll(studentID: number) {
    const url = `${this.baseURL}/get-all?studentID=${studentID}`;

    return this.http
      .get<LanguageCompetencyDTO[]>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetOne(competencyID: number) {
    const url = `${this.baseURL}/get-one?competencyID=${competencyID}`;

    return this.http
      .get<LanguageCompetencyDTO>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(studentID: number, body: LanguageCompetencyFormModel) {
    const url = `${this.baseURL}/create?studentID=${studentID}`;

    const formData = toFormData(body);

    return this.http
      .post(url, formData, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Update(competencyID: number, body: LanguageCompetencyFormModel) {
    const url = `${this.baseURL}/update?competencyID=${competencyID}`;

    const formData = toFormData(body);

    return this.http
      .post(url, formData, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Delete(competencyID: number) {
    const url = `${this.baseURL}/delete?competencyID=${competencyID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
