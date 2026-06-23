import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import {
  Button,
  Column,
  DataTable,
} from '../../../../../shared/components/data-tables/data-table/data-table';
import { LanguageCompetencyService } from '../../../services/language-competency.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LanguageCompetencyBase } from '../../../models/language-competency.model';
import { catchError, EMPTY, map } from 'rxjs';
import { studentsPaths } from '../../../students.paths';

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

  buttons: Button[] = [
    {
      label: 'Create',
      disable: false,
      url: () => studentsPaths.profiles(this.studentID()).competencies_create,
    },
    {
      label: 'Update',
      disable: true,
      url: (row: LanguageCompetencyBase | null) =>
        row
          ? studentsPaths
              .profiles(this.studentID())
              .competencies_update(row.languageCompetencyID.toString())
          : [''],
    },
    {
      label: 'Delete',
      disable: true,
      handler: (row: WritableSignal<LanguageCompetencyBase | null>) => {
        if (!row()) return;

        this.competenciesAPI
          .Delete(row()?.languageCompetencyID!)
          .pipe(catchError((err) => EMPTY))
          .subscribe((res) => {
            this.competenciesResource.reload();
            row.set(null);
          });
      },
    },
  ];

  constructor() {
    effect(() => {
      if (this.competenciesResource.hasValue()) {
        this.competenciesSignal.set(this.competenciesResource.value());
      } else this.competenciesSignal.set([]);
    });
  }
}
