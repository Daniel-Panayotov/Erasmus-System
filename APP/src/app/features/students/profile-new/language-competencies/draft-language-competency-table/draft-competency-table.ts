import { Component, inject, input, WritableSignal } from '@angular/core';
import {
  Button,
  Column,
  DataTable,
} from '../../../../../shared/components/data-tables/data-table/data-table';
import { LanguageCompetencyBase } from '../../../models/language-competency.model';
import { studentsPaths } from '../../../students.paths';
import { ProfileDraftStore } from '../../profile-draft.store';

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

  buttons: Button[] = [
    {
      label: 'Create',
      disable: false,
      url: () => studentsPaths.newProfile(this.userID()).competencies_create,
    },
    {
      label: 'Update',
      disable: true,
      url: (row: LanguageCompetencyBase | null) =>
        row
          ? studentsPaths.newProfile(this.userID()).competencies_update(
              this.draftStore
                .competenciesDraft()
                .findIndex((v) => v == row)
                .toString(),
            )
          : [''],
    },
    {
      label: 'Delete',
      disable: true,
      handler: (row: WritableSignal<LanguageCompetencyBase | null>) => {
        const rowValue = row();
        if (!rowValue) return;

        const draft = this.draftStore.competenciesDraft();

        const index = draft.findIndex((v) => v == rowValue);
        if (index == -1) return;

        draft.splice(index, 1);
        this.draftStore.competenciesDraft.set([...draft]);

        row.set(null);
      },
    },
  ];

  get competenciesSignal() {
    return this.draftStore.competenciesDraft;
  }
}
