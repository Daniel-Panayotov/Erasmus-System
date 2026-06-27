import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { ContactBase } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administrationPaths } from '../../administration.paths';
import { catchError, EMPTY, map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact-base-table',
  imports: [DataTable],
  templateUrl: './contact-base-table.html',
})
export class ContactBaseTable {
  private contactsAPI = inject(ContactService);

  buttonsInput = input<Button<ContactBase>[]>();
  clickContact = output<ContactBase | null>();

  contactsResource = rxResource({
    stream: () => this.contactsAPI.GetAll().pipe(map((v) => v.body as ContactBase[])),
  });
  contactsSignal = signal<ContactBase[]>([]);

  buttons = computed<Button<ContactBase>[]>(() => [
    createButton(() => administrationPaths.contacts.create),
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
    ...(this.buttonsInput() ?? []),
  ]);

  columns: Column[] = [
    { label: 'ID', field: 'contactID' },
    { label: 'First name', field: 'firstName' },
    { label: 'Last name', field: 'lastName' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
  ];

  constructor() {
    effect(() => {
      if (this.contactsResource.hasValue()) this.contactsSignal.set(this.contactsResource.value());
      else this.contactsSignal.set([]);
    });
  }

  clickRow(row: ContactBase | null) {
    this.clickContact.emit(row);
  }
}
