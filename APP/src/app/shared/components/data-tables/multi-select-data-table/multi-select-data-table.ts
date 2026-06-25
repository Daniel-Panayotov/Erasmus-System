import { Component, effect, inject, input, signal } from '@angular/core';
import { Column, DataTable } from '../data-table/data-table';
import { Button } from '../../../models/data-table.model';
import {
  CdkDragDrop,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { LanguageCompetencyService } from '../../../../features/students/services/language-competency.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { LanguageCompetencyBase } from '../../../../features/students/models/language-competency.model';
import { createButton, deleteButton, updateButton } from '../../../utils/table-buttons';
import { studentPaths } from '../../../../features/students/student.paths';

@Component({
  selector: 'app-multi-select-data-table',
  imports: [DataTable, CdkDropListGroup],
  templateUrl: './multi-select-data-table.html',
  styleUrl: './multi-select-data-table.css',
})
export class MultiSelectDataTable {
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
  filteredCompSignal = signal<LanguageCompetencyBase[]>([]);
  selectedCompSignal = signal<LanguageCompetencyBase[]>([]);

  signalForDrop = [this.selectedCompSignal, this.filteredCompSignal, this.competenciesSignal];

  columns: Column[] = [
    { label: 'ID', field: 'languageCompetencyID' },
    { label: 'Language', field: 'language' },
    { label: 'Can Follow Lectures', field: 'canFollowLectures' },
    { label: 'Can Follow Lectures With Lessons', field: 'canFollowLecturesWithLessons' },
  ];

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

  constructor() {
    effect(() => {
      if (this.competenciesResource.hasValue()) {
        this.competenciesSignal.set(this.competenciesResource.value());
      } else this.competenciesSignal.set([]);
    });
  }

  out(drop: CdkDragDrop<string[]>) {
    const srcSignal = this.signalForDrop[parseInt(drop.previousContainer.id.at(-1)!)];

    if (drop.previousContainer === drop.container) {
      moveItemInArray(srcSignal(), drop.previousIndex, drop.currentIndex);
      srcSignal.update((list) => [...list]);
      return;
    }

    const targetSignal = this.signalForDrop[parseInt(drop.container.id.at(-1)!)];

    transferArrayItem(srcSignal(), targetSignal(), drop.previousIndex, drop.currentIndex);
    srcSignal.update((list) => [...list]);
    targetSignal.update((list) => [...list]);
  }
}
