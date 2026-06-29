import { CdkDragDrop, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, inject, input, OnDestroy, ViewChild } from '@angular/core';
import { DropTarget } from '../../../../shared/models/data-table.model';
import { InstitutionsStore } from '../institutions.store';
import { ContactBaseTable } from '../../shared/contact-table/contact-base-table';
import { ContactBase } from '../../models/contact.model';
import { ContactParameter } from '../../../../shared/models/parameter.model';
import { InstitutionService } from '../../services/institution.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Institution, SaveInstitution } from '../../models/institution.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-institution-contacts-table',
  imports: [ContactBaseTable, CdkDropListGroup],
  template: `
    <div cdkDropListGroup class="table-page-container">
      <app-contact-base-table
        #select
        [parameters]="parameters()"
        (onDrop)="out($event, 'select')"
      />
      <app-contact-base-table #base [sourceFilter]="filter()" (onDrop)="out($event, 'base')" />
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
export class UpdateInstitutionContactsTable implements OnDestroy {
  private institutionAPI = inject(InstitutionService);
  private institutionsStore = inject(InstitutionsStore);

  institutionID = input.required<number>();

  @ViewChild('select') selectTable!: ContactBaseTable;
  @ViewChild('base') baseTable!: ContactBaseTable;

  institutionResource = rxResource({
    params: () => ({ institutionID: this.institutionID() }),
    stream: ({ params }) =>
      this.institutionAPI.GetOne(params.institutionID).pipe(map((v) => v.body as Institution)),
  });

  parameters = computed<ContactParameter[]>(() => [
    { field: 'institutionID', value: this.institutionID().toString() },
  ]);

  filter = computed(() => (src: ContactBase[]) => {
    if (!this.selectTable) return [];
    const selectIDs = this.selectTable.contacts().map((v) => v.contactID);

    return src.filter((v) => !selectIDs.includes(v.contactID));
  });

  out(drop: CdkDragDrop<ContactBase[]>, target: DropTarget) {
    const institution = this.institutionResource.value() ?? null;
    if (institution == null) return; //TODO error

    const dropItem = drop.previousContainer.data[drop.previousIndex];

    if (target == 'select') institution.contacts.push(dropItem);
    else
      institution.contacts = institution.contacts.filter((c) => c.contactID != dropItem.contactID);

    const body: SaveInstitution = {
      code: institution.code,
      name: institution.name,
      address: institution.address,
      contactIDs: institution.contacts.map((c) => c.contactID),
      facultyIDs: [],
    };

    this.institutionAPI.Update(this.institutionID(), body).subscribe({
      next: () => {
        this.selectTable.reload();
        this.baseTable.reload();
      },
      error(err: HttpErrorResponse) {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.institutionsStore.selectedinstitutionID.set(null);
  }
}
