import { Component, computed, inject, input, output } from '@angular/core';
import { Button } from '../../../../shared/models/data-table.model';
import { InstitutionBase } from '../../models/institution.model';
import { InstitutionService } from '../../services/institution.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administrationPaths } from '../../administration.paths';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Parameter } from '../../../../shared/models/parameter.model';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-institutions-base-table',
  imports: [DataTable],
  templateUrl: './institutions-base-table.html',
})
export class InstitutionsBaseTable {
  private institutionsAPI = inject(InstitutionService);

  overrideSource = input<InstitutionBase[]>();
  parameters = input<Parameter<InstitutionBase>[]>();
  additionalButtons = input<Button<InstitutionBase>[]>();
  overrideButtons = input<Button<InstitutionBase>[]>();
  clickRowEvent = output<InstitutionBase | null>();
  onDrop = output<CdkDragDrop<string[]>>();

  private institutionsResource = rxResource({
    params: () => ({ parameters: this.parameters() ?? [] }),
    stream: ({ params }) =>
      this.institutionsAPI.GetAll(params.parameters).pipe(map((v) => v.body as InstitutionBase[])),
  });

  private institutionsSignal = computed<InstitutionBase[]>(
    () => this.overrideSource() ?? this.institutionsResource.value() ?? [],
  );

  buttons = computed<Button<InstitutionBase>[]>(
    () => this.overrideButtons() ?? [...this.baseButtons, ...(this.additionalButtons() ?? [])],
  );

  private baseButtons: Button<InstitutionBase>[] = [
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
  ];

  columns: Column[] = [
    { label: 'ID', field: 'institutionID' },
    { label: 'Code', field: 'code' },
    { label: 'Name', field: 'name' },
    { label: 'Address', field: 'address' },
  ];

  get institutions() {
    return this.institutionsSignal;
  }
}
