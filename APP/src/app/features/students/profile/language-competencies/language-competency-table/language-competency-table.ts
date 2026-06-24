import { Component, effect, inject, input, signal } from '@angular/core';
import {
  Column,
  DataTable,
} from '../../../../../shared/components/data-tables/data-table/data-table';
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

@Component({
  selector: 'app-language-competency-table',
  imports: [DataTable],
  templateUrl: './language-competency-table.html',
  styleUrl: './language-competency-table.css',
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

  competenciesSignal = signal<LanguageCompetencyBase[]>([]);

  columns: Column[] = [
    { label: 'ID', field: 'languageCompetencyID' },
    { label: 'Language', field: 'language' },
    { label: 'Can Follow Lectures', field: 'canFollowLectures' },
    { label: 'Can Follow Lectures With Lessons', field: 'canFollowLecturesWithLessons' },
  ];

  buttons: Button<LanguageCompetencyBase | null>[] = [
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

  constructor() {
    effect(() => {
      if (this.competenciesResource.hasValue()) {
        this.competenciesSignal.set(this.competenciesResource.value());
      } else this.competenciesSignal.set([]);
    });
  }
}
