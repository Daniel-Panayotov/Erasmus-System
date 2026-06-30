import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { ContactBase } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administrationPaths } from '../../administration.paths';
import { catchError, EMPTY, map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ContactParameter } from '../../../../shared/models/parameter.model';

@Component({
  selector: 'app-contact-base-table',
  imports: [DataTable],
  templateUrl: './contact-base-table.html',
})
export class ContactBaseTable {
  private contactsAPI = inject(ContactService);

  overrideSource = input<ContactBase[]>();
  sourceFilter = input<(src: ContactBase[]) => ContactBase[]>();
  parameters = input<ContactParameter[]>();

  additionalButtons = input<Button<ContactBase>[]>();
  overrideButtons = input<Button<ContactBase>[]>();

  clickRowEvent = output<ContactBase | null>();
  onDrop = output<CdkDragDrop<ContactBase[]>>();

  contactsResource = rxResource({
    params: () => ({ parameters: this.parameters() ?? [] }),
    stream: ({ params }) =>
      this.contactsAPI.GetAll(params.parameters).pipe(map((v) => v.body as ContactBase[])),
  });
  reload = () => this.contactsResource.reload();

  private resourceValue = computed(() => this.contactsResource.value() ?? []);
  private filteredSource = computed<ContactBase[]>(
    () => this.sourceFilter()?.(this.resourceValue()) ?? this.resourceValue(),
  );

  private computedSource = computed<ContactBase[]>(
    () => this.overrideSource() ?? this.filteredSource(),
  );
  contacts = signal<ContactBase[]>([]);

  buttons = computed<Button<ContactBase>[]>(
    () => this.overrideButtons() ?? [...this.baseButtons, ...(this.additionalButtons() ?? [])],
  );

  private baseButtons: Button<ContactBase>[] = [
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
  ];

  columns: Column[] = [
    { label: 'ID', field: 'contactID' },
    { label: 'First name', field: 'firstName' },
    { label: 'Last name', field: 'lastName' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
  ];

  constructor() {
    effect(() => {
      this.contacts.set(this.computedSource());
    });
  }
}
