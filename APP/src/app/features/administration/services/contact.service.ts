import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { take } from 'rxjs';
import { ContactBase, ContactData, SaveContact } from '../models/contact.model';

@Service()
export class ContactService {
  private http = inject(HttpClient);

  public GetOne(contactID: number) {
    const url = `contacts/get-one?contactID=${contactID}`;

    return this.http
      .get<ContactBase>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public GetAll() {
    const url = `contacts/get-all`;

    return this.http
      .get<ContactBase[]>(url, { observe: 'response', credentials: 'include' })
      .pipe(take(1));
  }

  public Create(body: SaveContact) {
    const url = `contacts/create`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Update(contactID: number, body: ContactData) {
    const url = `contacts/update?contactID=${contactID}`;

    return this.http.post(url, body, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }

  public Delete(contactID: number) {
    const url = `contacts/delete?contactID=${contactID}`;

    return this.http.delete(url, { observe: 'response', credentials: 'include' }).pipe(take(1));
  }
}
