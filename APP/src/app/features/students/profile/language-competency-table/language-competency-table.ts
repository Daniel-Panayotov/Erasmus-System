import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import {
  Column,
  RelatedTableView,
} from '../../../../shared/components/related-table-view/related-table-view';
import { LanguageCompetencyAPI } from '../../services/language-competency.api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LanguageCompetencyBase } from '../../models/language-competency.form.model';
import { catchError, EMPTY, map } from 'rxjs';
import { studentsPaths } from '../../students.paths';

@Component({
  selector: 'app-language-competency-table',
  imports: [RelatedTableView],
  templateUrl: './language-competency-table.html',
  styleUrl: './language-competency-table.css',
})
export class LanguageCompetencyTable {
  private competenciesAPI = inject(LanguageCompetencyAPI);

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

  urls = {
    create: () => studentsPaths.languageCompetenciesCreate(this.studentID()),
    update: (row: LanguageCompetencyBase) =>
      studentsPaths.languageCompetencyUpdate(this.studentID(), row.languageCompetencyID.toString()),
  };

  constructor() {
    effect(() => {
      if (this.competenciesResource.hasValue()) {
        this.competenciesSignal.set(this.competenciesResource.value());
      } else this.competenciesSignal.set([]);
    });
  }

  deleteCompetency(clickedRow: WritableSignal<LanguageCompetencyBase | null>) {
    if (!clickedRow()) return;

    this.competenciesAPI
      .Delete(clickedRow()?.languageCompetencyID!)
      .pipe(catchError((err) => EMPTY))
      .subscribe((res) => {
        this.competenciesResource.reload();
        clickedRow.set(null);
      });
  }
}
