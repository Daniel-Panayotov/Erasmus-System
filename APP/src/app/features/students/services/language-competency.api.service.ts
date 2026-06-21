import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import {
  LanguageCompetencyBase,
  LanguageCompetencyData,
} from '../models/language-competency.form.model';
import { take } from 'rxjs';

@Service()
export class LanguageCompetencyAPI {
  private http = inject(HttpClient);

  public GetAll(studentID: number) {
    const url = `language-competencies/get-all?studentID=${studentID}`;

    return this.http
      .get<LanguageCompetencyBase[]>(url, {
        observe: 'response',
        credentials: 'include',
      })
      .pipe(take(1));
  }

  public Create(studentID: number, body: LanguageCompetencyData) {
    const url = `language-competencies/create?studentID=${studentID}`;

    return this.http
      .post(url, body, {
        observe: 'response',
        credentials: 'include',
      })
      .pipe(take(1));
  }

  public Update(competencyID: number, body: LanguageCompetencyData) {
    const url = `language-competencies/update?competencyID=${competencyID}`;

    return this.http
      .post(url, body, {
        observe: 'response',
        credentials: 'include',
      })
      .pipe(take(1));
  }

  public Delete(competencyID: number) {
    const url = `language-competencies/delete?competencyID=${competencyID}`;

    return this.http
      .delete(url, {
        observe: 'response',
        credentials: 'include',
      })
      .pipe(take(1));
  }
}
