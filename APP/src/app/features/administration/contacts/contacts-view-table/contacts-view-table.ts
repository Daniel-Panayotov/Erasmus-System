import { Component, effect, inject, signal } from '@angular/core';
import { ContactTable } from '../../shared/contact-table/contact-table';
import { Button } from '../../../../shared/models/data-table.model';
import { ContactBase } from '../../models/contact.model';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administrationPaths } from '../../administration.paths';
import { ContactService } from '../../services/contact.service';
import { catchError, EMPTY, map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-view-table',
  imports: [ContactTable],
  templateUrl: './contacts-view-table.html',
})
export class ContactsViewTable {
  private contactsAPI = inject(ContactService);

  contactsResource = rxResource({
    stream: () => this.contactsAPI.GetAll().pipe(map((v) => v.body as ContactBase[])),
  });

  contactsSignal = signal<ContactBase[]>([]);

  buttons: Button<ContactBase>[] = [
    createButton(() => administrationPaths.contacts_new.create),
    updateButton((row) =>
      row == null ? [''] : administrationPaths.contacts.update(row.contactID.toString()),
    ),
    deleteButton((row) => {
      if (!row()) return;

      this.contactsAPI
        .Delete(row()?.contactID!)
        .pipe(catchError((err) => EMPTY))
        .subscribe((res) => {
          this.contactsResource.reload();
          row.set(null);
        });
    }),
  ];

  constructor() {
    effect(() => {
      if (this.contactsResource.hasValue()) this.contactsSignal.set(this.contactsResource.value());
      else this.contactsSignal.set([]);
    });
  }
}
