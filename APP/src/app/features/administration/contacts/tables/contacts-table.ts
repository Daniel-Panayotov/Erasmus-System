import { Component, inject } from '@angular/core';
import { ContactBaseTable } from '../../shared/contact-table/contact-base-table';
import { ContactBase } from '../../models/contact.model';
import { ContactStore } from '../contact.store';

@Component({
  selector: 'app-contacts-table',
  imports: [ContactBaseTable],
  template: '<app-contact-base-table (clickRowEvent)="selectContact($event)" />',
})
export class ContactsTable {
  private contactStore = inject(ContactStore);

  selectContact(row: ContactBase | null) {
    this.contactStore.selectedContactID.set(row?.contactID ?? null);
  }
}
