import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { take } from 'rxjs';
import { ContactBaseDTO, ContactDataDTO } from '../models/contact.model';
import { ContactParameter } from '../../../shared/models/parameter.model';

@Service()
export class ContactService {
  private http = inject(HttpClient);

  public GetOne(contactID: number) {
    const url = `contacts/get-one?contactID=${contactID}`;

    return this.http
      .get<ContactBaseDTO>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetAll(queryParams: ContactParameter[]) {
    let url = `contacts/get-all`;

    if (queryParams.length > 0)
      url += '?' + queryParams.map((p) => `${p.field}=${p.value}`).join('&');

    return this.http
      .get<ContactBaseDTO[]>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(body: ContactDataDTO) {
    const url = `contacts/create`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Update(contactID: number, body: ContactDataDTO) {
    const url = `contacts/update?contactID=${contactID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Delete(contactID: number) {
    const url = `contacts/delete?contactID=${contactID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
