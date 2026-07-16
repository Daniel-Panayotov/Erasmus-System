import { Component, inject } from '@angular/core';
import { UniversityBaseTable } from '../../../shared/university-base-table/university-base-table';
import { UniversityTableDTO } from '../../../models/university.model';
import { UniversityStore } from '../../university.store';

@Component({
  selector: 'app-university-table',
  imports: [UniversityBaseTable],
  template: `<app-university-base-table (clickRowEvent)="selectUniversity($event)" />`,
})
export class UniversityTable {
  private universityStore = inject(UniversityStore);

  selectUniversity(row: UniversityTableDTO | null) {
    this.universityStore.selectedUniversityID.set(row?.universityID ?? null);
  }
}
