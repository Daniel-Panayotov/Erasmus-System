import { Component, inject, input } from '@angular/core';
import { LanguageCompetencyData } from '../../../models/language-competency.model';
import { studentPaths } from '../../../student.paths';
import { ProfileDraftStore } from '../../profile-draft.store';
import {
  createButton,
  deleteButton,
  updateButton,
} from '../../../../../shared/utils/table-buttons';
import { Button } from '../../../../../shared/models/data-table.model';
import { CompetencyTable } from '../../../shared/competency-table/competency-table';
import { removeFromArraySignalAt } from '../../../../../shared/utils/signal-utilities';

@Component({
  selector: 'app-draft-language-competency-table',
  imports: [CompetencyTable],
  templateUrl: './draft-competency-table.html',
})
export class DraftCompetencyTable {
  private draftStore = inject(ProfileDraftStore);

  userID = input.required<string>();

  buttons: Button<LanguageCompetencyData>[] = [
    createButton(() => studentPaths.newProfile(this.userID()).competencies_create),
    updateButton((row) =>
      studentPaths.newProfile(this.userID()).competencies_update(
        this.draftStore
          .competenciesDraft()
          .findIndex((v) => v == row)
          .toString(),
      ),
    ),
    deleteButton((row) => {
      const rowValue = row();
      if (!rowValue) return;

      const index = this.draftStore.competenciesDraft().findIndex((v) => v == rowValue);
      if (index == -1) return;

      removeFromArraySignalAt(this.draftStore.competenciesDraft, index);
      row.set(null);
    }),
  ];

  get competenciesSignal() {
    return this.draftStore.competenciesDraft;
  }
}
