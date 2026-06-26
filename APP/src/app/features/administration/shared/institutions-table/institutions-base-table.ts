import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-tables/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { InstitutionBase } from '../../models/institution.model';
import { InstitutionService } from '../../services/institution.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-institutions-base-table',
  imports: [DataTable],
  templateUrl: './institutions-base-table.html',
})
export class InstitutionsBaseTable {
  private institutionsAPI = inject(InstitutionService);

  buttonsInput = input<Button<InstitutionBase>[]>();
  clickinstitution = output<InstitutionBase | null>();

  institutionsResource = rxResource({
    stream: () => this.institutionsAPI.GetAll().pipe(map((v) => v.body as InstitutionBase[])),
  });
  institutionsSignal = signal<InstitutionBase[]>([]);

  buttons = computed<Button<InstitutionBase>[]>(() => [
    createButton(() => administrationPaths.institutions.create),
    updateButton((row) =>
      row == null ? [''] : administrationPaths.institutions.update(row.institutionID.toString()),
    ),
    deleteButton((row) => {
      if (!row()) return;

      this.institutionsAPI
        .Delete(row()?.institutionID!)
        .pipe(catchError((err) => EMPTY))
        .subscribe((res) => {
          this.institutionsResource.reload();
          row.set(null);
        });
    }),
    ...(this.buttonsInput() ?? []),
  ]);

  columns: Column[] = [
    { label: 'ID', field: 'institutionID' },
    { label: 'Code', field: 'code' },
    { label: 'Name', field: 'name' },
    { label: 'Address', field: 'address' },
  ];

  constructor() {
    effect(() => {
      if (this.institutionsResource.hasValue())
        this.institutionsSignal.set(this.institutionsResource.value());
      else this.institutionsSignal.set([]);
    });
  }

  clickRow(row: InstitutionBase | null) {
    this.clickinstitution.emit(row);
  }
}
