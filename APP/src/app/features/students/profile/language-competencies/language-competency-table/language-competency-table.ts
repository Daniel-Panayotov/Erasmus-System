import { Component, computed, inject, input } from '@angular/core';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LanguageCompetencyBase } from '../../../models/language-competency.model';
import { catchError, EMPTY, map } from 'rxjs';
import { studentPaths } from '../../../student.paths';
import { Button } from '../../../../../shared/models/data-table.model';
import {
  createButton,
  deleteButton,
  updateButton,
} from '../../../../../shared/utils/table-buttons';
import { CompetencyTable } from '../../../shared/competency-table/competency-table';

@Component({
  selector: 'app-language-competency-table',
  imports: [CompetencyTable],
  templateUrl: './language-competency-table.html',
})
export class LanguageCompetencyTable {
  private competenciesAPI = inject(LanguageCompetencyService);

  studentID = input.required<string>();

  competenciesResource = rxResource({
    params: () => ({ studentID: this.studentID() }),
    stream: ({ params }) =>
      this.competenciesAPI
        .GetAll(parseInt(params.studentID))
        .pipe(map((v) => v.body as LanguageCompetencyBase[])),
  });

  competenciesSignal = computed<LanguageCompetencyBase[]>(
    () => this.competenciesResource.value() ?? [],
  );

  buttons: Button<LanguageCompetencyBase>[] = [
    createButton(() => studentPaths.profiles(this.studentID()).competencies_create),
    updateButton((row) =>
      row == null
        ? ['']
        : studentPaths
            .profiles(this.studentID())
            .competencies_update(row.languageCompetencyID.toString()),
    ),
    deleteButton((row) => {
      if (!row()) return;

      this.competenciesAPI
        .Delete(row()?.languageCompetencyID!)
        .pipe(catchError((err) => EMPTY))
        .subscribe((res) => {
          this.competenciesResource.reload();
          row.set(null);
        });
    }),
  ];
}
