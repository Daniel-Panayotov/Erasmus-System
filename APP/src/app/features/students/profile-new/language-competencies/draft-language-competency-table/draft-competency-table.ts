import { Component, inject, input, WritableSignal } from '@angular/core';
import {
  Column,
  DataTableView,
} from '../../../../../shared/components/data-table-view/data-table-view';
import {
  LanguageCompetencyBase,
  LanguageCompetencyData,
} from '../../../models/language-competency.model';
import { studentsPaths } from '../../../students.paths';
import { ProfileDraftStore } from '../../profile-draft.store';

@Component({
  selector: 'app-draft-language-competency-table',
  imports: [DataTableView],
  templateUrl: './draft-competency-table.html',
  styleUrl: './draft-competency-table.css',
})
export class DraftCompetencyTable {
  private draftStore = inject(ProfileDraftStore);

  userID = input.required<string>();

  columns: Column[] = [
    { label: 'ID', field: 'languageCompetencyID' },
    { label: 'Language', field: 'language' },
    { label: 'Can Follow Lectures', field: 'canFollowLectures' },
    { label: 'Can Follow Lectures With Lessons', field: 'canFollowLecturesWithLessons' },
  ];

  urls = {
    create: () => studentsPaths.newProfile(this.userID()).competencies_create,
    update: (row: LanguageCompetencyBase) =>
      studentsPaths.newProfile(this.userID()).competencies_update(
        this.draftStore
          .competenciesDraft()
          .findIndex((v) => v == row)
          .toString(),
      ),
  };

  deleteCompetency(clickedRow: WritableSignal<LanguageCompetencyData | null>) {
    const row = clickedRow();
    if (!row) return;

    const draft = this.draftStore.competenciesDraft();

    const index = draft.findIndex((v) => v == row);
    if (index == -1) return;

    draft.splice(index, 1);
    this.draftStore.competenciesDraft.set([...draft]);

    clickedRow.set(null);
  }

  get competenciesSignal() {
    return this.draftStore.competenciesDraft;
  }
}
