import { Injectable, signal } from '@angular/core';
import { InstitutionFormModel } from '../models/institution.model';
import { ContactBase } from '../models/contact.model';

@Injectable()
export class InstitutionsStore {
  drafts = {
    touched: signal<boolean>(false),
    institutionModel: signal<InstitutionFormModel | null>(null),
    contacts: signal<ContactBase[]>([]),
  };

  selectedinstitutionID = signal<number | null>(null);

  resetDrafts() {
    this.drafts.touched.set(false);
    this.drafts.institutionModel.set(null);
    this.drafts.contacts.set([]);
  }
}
