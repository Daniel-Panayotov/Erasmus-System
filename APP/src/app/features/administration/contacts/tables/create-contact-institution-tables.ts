import { CdkDragDrop, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';
import { InstitutionsBaseTable } from '../../shared/institutions-table/institutions-base-table';
import { ContactsStore } from '../contact.store';
import { InstitutionBase } from '../../models/institution.model';
import { DropTarget } from '../../../../shared/models/data-table.model';

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
      <app-institutions-base-table [sourceFilter]="filter()" (onDrop)="out($event, 'base')" />
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

  overrideSelect = computed<InstitutionBase[]>(() =>
    this.contactsStore.drafts.institution() ? [this.contactsStore.drafts.institution()!] : [],
  );

  filter = computed(
    () => (src: InstitutionBase[]) =>
      src.filter((v) => this.contactsStore.drafts.institution()?.institutionID != v.institutionID),
  );

  out(drop: CdkDragDrop<InstitutionBase[]>, target: DropTarget) {
    if (target == 'select')
      this.contactsStore.drafts.institution.set(drop.previousContainer.data[drop.previousIndex]);
    else this.contactsStore.drafts.institution.set(null);
  }
}
