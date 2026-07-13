import { Component, computed, inject, input } from '@angular/core';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LanguageCompetencyTableDTO } from '../../../models/language-competency.model';
import { catchError, EMPTY, map } from 'rxjs';
import { studentsTree } from '../../../student.paths';
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
  template: '<app-competency-table [competencies]="competenciesSignal()" [buttons]="buttons" />',
})
export class LanguageCompetencyTable {
  private competenciesAPI = inject(LanguageCompetencyService);

  studentID = input.required<string>();

  competenciesResource = rxResource({
    params: () => ({ studentID: this.studentID() }),
    stream: ({ params }) =>
      this.competenciesAPI.GetAll(parseInt(params.studentID)).pipe(
        map((v) =>
          v.body?.map(
            (v) =>
              ({
                languageCompetencyID: v.baseDTO.languageCompetencyID,
                certificateUrl: v.certificateBase
                  ? this.competenciesAPI.certificateUrl(v.baseDTO.languageCompetencyID)
                  : undefined,
                ...v.baseDTO.dataDTO,
              }) as LanguageCompetencyTableDTO,
          ),
        ),
      ),
  });

  competenciesSignal = computed<LanguageCompetencyTableDTO[]>(
    () => this.competenciesResource.value() ?? [],
  );

  buttons: Button<LanguageCompetencyTableDTO>[] = [
    createButton(
      () => studentsTree.studentID(this.studentID()).profile.language_competencies.create.segments,
    ),
    updateButton((row) =>
      row == null
        ? ['']
        : studentsTree
            .studentID(this.studentID())
            .profile.language_competencies.update.competencyID(row.languageCompetencyID.toString())
            .segments,
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
