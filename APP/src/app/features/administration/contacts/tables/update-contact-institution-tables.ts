import { Component, computed, inject, input, OnDestroy, ViewChild } from '@angular/core';
import { InstitutionsBaseTable } from '../../shared/institutions-table/institutions-base-table';
import { CdkDragDrop, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { InstitutionBase } from '../../models/institution.model';
import { DropTarget } from '../../../../shared/models/data-table.model';
import { ContactStore } from '../contact.store';
import { InstitutionParameter } from '../../../../shared/models/parameter.model';
import { ContactService } from '../../services/contact.service';
import { Contact, SaveContact } from '../../models/contact.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-contact-institutions-table',
  imports: [InstitutionsBaseTable, CdkDropListGroup],
  template: `
    <div cdkDropListGroup class="table-page-container">
      <app-institutions-base-table
        #select
        [parameters]="parameters()"
        (onDrop)="out($event, 'select')"
      />
      <app-institutions-base-table #base [sourceFilter]="filter()" (onDrop)="out($event, 'base')" />
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
export class UpdateContactInstitutionsTable implements OnDestroy {
  private contactAPI = inject(ContactService);
  private contactStore = inject(ContactStore);

  contactID = input.required<number>();

  @ViewChild('select') selectTable!: InstitutionsBaseTable;
  @ViewChild('base') baseTable!: InstitutionsBaseTable;

  contactResource = rxResource({
    params: () => ({ contactID: this.contactID() }),
    stream: ({ params }) =>
      this.contactAPI.GetOne(params.contactID).pipe(map((v) => v.body as Contact)),
  });

  parameters = computed<InstitutionParameter[]>(() => [
    { field: 'contactID', value: this.contactID().toString() },
  ]);

  filter = computed(() => (src: InstitutionBase[]) => {
    if (!this.selectTable) return [];
    const selectIDs = this.selectTable.institutions().map((v) => v.institutionID);

    return src.filter((v) => !selectIDs.includes(v.institutionID));
  });

  out(drop: CdkDragDrop<InstitutionBase[]>, target: DropTarget) {
    const contact = this.contactResource.value() ?? null;
    if (contact == null) return; //TODO Display error

    const body: SaveContact = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      institutionID: drop.previousContainer.data[drop.previousIndex].institutionID,
    };

    if (target == 'base') body.institutionID = null;

    this.contactAPI.Update(this.contactID(), body).subscribe({
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
    this.contactStore.selectedContactID.set(null);
  }
}
