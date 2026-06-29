import { Injectable, signal } from '@angular/core';
import { ContactFormModel } from '../models/contact.model';
import { InstitutionBase } from '../models/institution.model';

@Injectable()
export class ContactsStore {
  drafts = {
    contactModel: signal<ContactFormModel | null>(null),
    institution: signal<InstitutionBase | null>(null),
  };

  selectedContactID = signal<number | null>(null);

  resetDrafts() {
    this.drafts.contactModel.set(null);
    this.drafts.institution.set(null);
  }
}
