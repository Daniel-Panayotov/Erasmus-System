import { CdkDragDrop, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, inject, ViewChild } from '@angular/core';
import { DropTarget } from '../../../../shared/models/data-table.model';
import { InstitutionsStore } from '../institutions.store';
import { ContactBaseTable } from '../../shared/contact-table/contact-base-table';
import { ContactBase } from '../../models/contact.model';
import { moveBetweenSignalArrays } from '../../../../shared/utils/signal-utilities';

@Component({
  selector: 'app-create-institution-contacts-table',
  imports: [ContactBaseTable, CdkDropListGroup],
  template: `
    <div cdkDropListGroup class="table-page-container">
      <app-contact-base-table
        #select
        [overrideSource]="contactDraft()"
        [overrideButtons]="[]"
        (onDrop)="out($event, 'select')"
      />
      <app-contact-base-table #base (onDrop)="out($event, 'base')" />
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

  @ViewChild('base') baseTable!: ContactBaseTable;

  contactDraft = this.institutionsStore.drafts.contacts;

  out(drop: CdkDragDrop<ContactBase[]>, target: DropTarget) {
    let srcSignal = target == 'base' ? this.contactDraft : this.baseTable.contacts;
    let targetSignal = target == 'base' ? this.baseTable.contacts : this.contactDraft;

    moveBetweenSignalArrays(srcSignal, targetSignal, drop.previousIndex, drop.currentIndex);
  }
}
