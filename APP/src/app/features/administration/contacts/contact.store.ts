import { Injectable, signal } from '@angular/core';
import { ContactDataDTO } from '../models/contact.model';

@Injectable()
export class ContactsStore {
  drafts = {
    touched: signal<boolean>(false),
    contactModel: signal<ContactDataDTO | null>(null),
  };

  selectedContactID = signal<number | null>(null);

  resetDrafts() {
    this.drafts.touched.set(false);
    this.drafts.contactModel.set(null);
  }
}
