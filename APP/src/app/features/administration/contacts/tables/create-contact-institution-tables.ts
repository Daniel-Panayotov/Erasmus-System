import { CdkDragDrop, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, computed, inject, ViewChild } from '@angular/core';
import { InstitutionsBaseTable } from '../../shared/institutions-table/institutions-base-table';
import { ContactsStore } from '../contact.store';
import { InstitutionBase } from '../../models/institution.model';
import { DropTarget } from '../../../../shared/models/data-table.model';
import {
  insertInArraySignalAt,
  removeFromArraySignalAt,
} from '../../../../shared/utils/signal-utilities';

@Component({
  selector: 'app-create-contact-institutions-table',
  imports: [InstitutionsBaseTable, CdkDropListGroup],
  template: `
    <div cdkDropListGroup class="table-page-container">
      <app-institutions-base-table
        [overrideSource]="overrideSelect()"
        [overrideButtons]="[]"
        (onDrop)="out($event, 'select')"
      />
      <app-institutions-base-table #base (onDrop)="out($event, 'base')" />
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
export class CreateContactInstitutionsTable {
  private contactsStore = inject(ContactsStore);

  @ViewChild('base') baseTable!: InstitutionsBaseTable;

  draftInstitution = this.contactsStore.drafts.institution;

  overrideSelect = computed<InstitutionBase[]>(() =>
    this.draftInstitution() ? [this.draftInstitution()!] : [],
  );

  out(drop: CdkDragDrop<InstitutionBase[]>, target: DropTarget) {
    const baseSource = this.baseTable.institutions;

    if (target == 'select') {
      const item = removeFromArraySignalAt(baseSource, drop.previousIndex);
      if (this.draftInstitution() != null)
        insertInArraySignalAt(baseSource, this.draftInstitution(), drop.previousIndex);

      this.draftInstitution.set(item);
    } else {
      insertInArraySignalAt(baseSource, this.contactsStore.drafts.institution(), drop.currentIndex);
      this.draftInstitution.set(null);
    }
  }
}
