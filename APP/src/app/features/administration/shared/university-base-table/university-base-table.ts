import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';
import { UniversityService } from '../../services/university.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { UniversityTableDTO } from '../../models/university.model';
import { Button } from '../../../../shared/models/data-table.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { createButton, deleteButton, updateButton } from '../../../../shared/utils/table-buttons';
import { administration } from '../../administration.paths';
import { UniversityParameter } from '../../../../shared/models/parameter.model';

@Component({
  selector: 'app-university-base-table',
  imports: [DataTable],
  template: `<app-data-table
    [dataSignal]="universities()"
    [columns]="columns"
    [buttons]="buttons()"
    (clickRowEvent)="clickRowEvent.emit($event)"
    (onDrop)="onDrop.emit($event)"
  />`,
})
export class UniversityBaseTable {
  private universityAPI = inject(UniversityService);

  overrideSource = input<UniversityTableDTO[]>();
  sourceFilter = input<(src: UniversityTableDTO[]) => UniversityTableDTO[]>();
  parameters = input<UniversityParameter[]>([]);

  additionalButtons = input<Button<UniversityTableDTO>[]>();
  overrideButtons = input<Button<UniversityTableDTO>[]>();

  clickRowEvent = output<UniversityTableDTO | null>();
  onDrop = output<CdkDragDrop<UniversityTableDTO[]>>();

  universitiesResource = rxResource({
    params: () => ({ parameters: this.parameters() ?? [] }),
    stream: ({ params }) =>
      this.universityAPI
        .GetAll(params.parameters)
        .pipe(
          map((v) =>
            v.body?.map(
              (u) => ({ universityID: u.universityID, ...u.dataDTO }) as UniversityTableDTO,
            ),
          ),
        ),
  });
  reload = () => this.universitiesResource.reload();

  private resourceValue = computed(() => this.universitiesResource.value() ?? []);
  private filteredSource = computed<UniversityTableDTO[]>(
    () => this.sourceFilter()?.(this.resourceValue()) ?? this.resourceValue(),
  );

  private computedSource = computed<UniversityTableDTO[]>(
    () => this.overrideSource() ?? this.filteredSource(),
  );
  universities = signal<UniversityTableDTO[]>([]);

  buttons = computed<Button<UniversityTableDTO>[]>(
    () => this.overrideButtons() ?? [...this.baseButtons, ...(this.additionalButtons() ?? [])],
  );

  private baseButtons: Button<UniversityTableDTO>[] = [
    createButton(() => administration.universities.create.segments),
    updateButton((row) =>
      row == null
        ? ['']
        : administration.universities.universityID(row.universityID.toString()).update.segments,
    ),
    deleteButton((row) => {
      if (!row()) return;

      this.universityAPI
        .Delete(row()?.universityID!)
        .pipe(catchError((err) => EMPTY))
        .subscribe((res) => {
          this.universitiesResource.reload();
          row.set(null);
        });
    }),
  ];

  columns: Column[] = [
    { label: 'ID', field: 'universityID' },
    { label: 'Code', field: 'code' },
    { label: 'Name', field: 'name' },
    { label: 'Address', field: 'address' },
  ];

  constructor() {
    effect(() => {
      this.universities.set(this.computedSource());
    });
  }
}
