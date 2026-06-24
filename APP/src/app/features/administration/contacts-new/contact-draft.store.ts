import { Injectable, signal } from '@angular/core';
import { ContactFormModel } from '../models/contact.model';
import { InstitutionBase } from '../models/institution.model';

@Injectable()
export class ContactDraftStore {
  contact = signal<ContactFormModel | null>(null);
  institution = signal<InstitutionBase | null>(null);

  resetDrafts() {
    this.contact.set(null);
    this.institution.set(null);
  }
}
