import { Component, inject } from '@angular/core';
import { ContactBaseTable } from '../../shared/contact-table/contact-base-table';
import { ContactTableDTO } from '../../models/contact.model';
import { ContactsStore } from '../contact.store';

@Component({
  selector: 'app-contacts-table',
  imports: [ContactBaseTable],
  template: '<app-contact-base-table (clickRowEvent)="selectContact($event)" />',
})
export class ContactsTable {
  private contactsStore = inject(ContactsStore);

  selectContact(row: ContactTableDTO | null) {
    this.contactsStore.selectedContactID.set(row?.contactID ?? null);
  }
}
