import { Component, inject } from '@angular/core';
import { InstitutionBase } from '../models/institution.model';
import { InstitutionsBaseTable } from '../shared/institutions-table/institutions-base-table';

@Component({
  selector: 'app-contacts-table',
  imports: [InstitutionsBaseTable],
  template: '<app-institutions-base-table (clickRowEvent)="selectInstitution($event)" />',
})
export class InstitutionsTable {
  selectInstitution(row: InstitutionBase | null) {}
}
