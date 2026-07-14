import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { ContactTableDTO } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administration } from '../../administration.paths';
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

  overrideSource = input<ContactTableDTO[]>();
  sourceFilter = input<(src: ContactTableDTO[]) => ContactTableDTO[]>();
  parameters = input<ContactParameter[]>();

  additionalButtons = input<Button<ContactTableDTO>[]>();
  overrideButtons = input<Button<ContactTableDTO>[]>();

  clickRowEvent = output<ContactTableDTO | null>();
  onDrop = output<CdkDragDrop<ContactTableDTO[]>>();

  contactsResource = rxResource({
    params: () => ({ parameters: this.parameters() ?? [] }),
    stream: ({ params }) =>
      this.contactsAPI
        .GetAll(params.parameters)
        .pipe(
          map((v) =>
            v.body!.map((c) => ({ contactID: c.contactID, ...c.dataDTO }) as ContactTableDTO),
          ),
        ),
  });
  reload = () => this.contactsResource.reload();

  private resourceValue = computed(() => this.contactsResource.value() ?? []);
  private filteredSource = computed<ContactTableDTO[]>(
    () => this.sourceFilter()?.(this.resourceValue()) ?? this.resourceValue(),
  );

  private computedSource = computed<ContactTableDTO[]>(
    () => this.overrideSource() ?? this.filteredSource(),
  );
  contacts = signal<ContactTableDTO[]>([]);

  buttons = computed<Button<ContactTableDTO>[]>(
    () => this.overrideButtons() ?? [...this.baseButtons, ...(this.additionalButtons() ?? [])],
  );

  private baseButtons: Button<ContactTableDTO>[] = [
    createButton(() => administration.contacts.create.segments),
    updateButton((row) =>
      row == null
        ? ['']
        : administration.contacts.contactID(row.contactID.toString()).update.segments,
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
