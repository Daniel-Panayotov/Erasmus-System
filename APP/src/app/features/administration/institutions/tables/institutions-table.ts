import { Component, inject } from '@angular/core';
import { InstitutionsBaseTable } from '../../shared/institutions-table/institutions-base-table';
import { InstitutionsStore } from '../institutions.store';
import { InstitutionBase } from '../../models/institution.model';

@Component({
  selector: 'app-contacts-table',
  imports: [InstitutionsBaseTable],
  template: '<app-institutions-base-table (clickRowEvent)="selectInstitution($event)" />',
})
export class InstitutionsTable {
  private institutionStore = inject(InstitutionsStore);
  selectInstitution(row: InstitutionBase | null) {
    this.institutionStore.selectedinstitutionID.set(row?.institutionID ?? null);
  }
}
