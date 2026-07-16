import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UniversityBaseDTO, UniversityDataDTO } from '../models/university.model';
import { take } from 'rxjs';
import { UniversityParameter } from '../../../shared/models/parameter.model';

@Service()
export class UniversityService {
  private http = inject(HttpClient);

  private baseURL = 'universities';

  public GetOne(universityID: number) {
    const url = `${this.baseURL}/get-one?universityID=${universityID}`;

    return this.http
      .get<UniversityBaseDTO>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetAll(queryParams: UniversityParameter[]) {
    let url = `${this.baseURL}/get-all`;

    return this.http
      .get<UniversityBaseDTO[]>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(body: UniversityDataDTO) {
    const url = `${this.baseURL}/create`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Update(universityID: number, body: UniversityDataDTO) {
    const url = `${this.baseURL}/update?universityID=${universityID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Delete(universityID: number) {
    const url = `${this.baseURL}/delete?universityID=${universityID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
