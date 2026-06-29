import { Injectable, signal } from '@angular/core';
import { InstitutionFormModel } from '../models/institution.model';
import { ContactBase } from '../models/contact.model';

@Injectable()
export class InstitutionsStore {
  institutionModel = signal<InstitutionFormModel | null>(null);
  contacts = signal<ContactBase[]>([]);

  selectedinstitutionID = signal<number | null>(null);

  resetDrafts() {
    this.institutionModel.set(null);
    this.contacts.set([]);
  }
}
