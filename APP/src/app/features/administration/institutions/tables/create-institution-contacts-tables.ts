import { CdkDragDrop, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { DropTarget } from '../../../../shared/models/data-table.model';
import { InstitutionsStore } from '../institutions.store';
import { ContactBaseTable } from '../../shared/contact-table/contact-base-table';
import { ContactBase } from '../../models/contact.model';

@Component({
  selector: 'app-create-institution-contacts-table',
  imports: [ContactBaseTable, CdkDropListGroup],
  template: `
    <div cdkDropListGroup class="table-page-container">
      <app-contact-base-table
        [overrideSource]="overrideSelect()"
        [overrideButtons]="[]"
        (onDrop)="out($event, 'select')"
      />
      <app-contact-base-table [sourceFilter]="filter()" (onDrop)="out($event, 'base')" />
    </div>
  `,
  styles: `
    .table-page-container {
      height: 100%;
      overflow: auto;
    }

    .table-page-container > * {
      max-height: 50vh;
      display: block;
    }
  `,
})
export class CreateInstitutionContactsTable {
  private institutionsStore = inject(InstitutionsStore);

  overrideSelect = this.institutionsStore.contacts;

  filter = computed(() => (src: ContactBase[]) => {
    const selectIDs = this.overrideSelect().map((v) => v.contactID);
    return src.filter((v) => !selectIDs.includes(v.contactID));
  });

  out(drop: CdkDragDrop<ContactBase[]>, src: DropTarget) {
    if (src == 'select')
      this.institutionsStore.contacts.update((v) => [
        ...v,
        drop.previousContainer.data[drop.previousIndex],
      ]);
    else
      this.institutionsStore.contacts.update((v) => {
        v.splice(drop.previousIndex, 1);
        return [...v];
      });
  }
}
