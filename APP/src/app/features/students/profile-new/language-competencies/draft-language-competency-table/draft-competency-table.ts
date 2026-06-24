import { Component, inject, input } from '@angular/core';
import {
  Column,
  DataTable,
} from '../../../../../shared/components/data-tables/data-table/data-table';
import { LanguageCompetencyBase } from '../../../models/language-competency.model';
import { studentPaths } from '../../../student.paths';
import { ProfileDraftStore } from '../../profile-draft.store';
import {
  createButton,
  deleteButton,
  updateButton,
} from '../../../../../shared/utils/table-buttons';
import { Button } from '../../../../../shared/models/data-table.model';

@Component({
  selector: 'app-draft-language-competency-table',
  imports: [DataTable],
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

  buttons: Button<LanguageCompetencyBase>[] = [
    createButton(() => studentPaths.newProfile(this.userID()).competencies_create),
    updateButton((row) =>
      studentPaths.newProfile(this.userID()).competencies_update(
        this.draftStore
          .competenciesDraft()
          .findIndex((v) => v == row)
          .toString(),
      ),
    ),
    deleteButton<LanguageCompetencyBase | null>((row) => {
      const rowValue = row();
      if (!rowValue) return;

      const draft = this.draftStore.competenciesDraft();

      const index = draft.findIndex((v) => v == rowValue);
      if (index == -1) return;

      draft.splice(index, 1);
      this.draftStore.competenciesDraft.set([...draft]);

      row.set(null);
    }),
  ];

  get competenciesSignal() {
    return this.draftStore.competenciesDraft;
  }
}
