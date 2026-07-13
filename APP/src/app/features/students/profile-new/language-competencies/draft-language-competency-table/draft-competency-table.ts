import { Component, computed, inject, input } from '@angular/core';
import {
  LanguageCompetencyTableDTO,
  LanguageCompetencyData,
} from '../../../models/language-competency.model';
import { studentsTree } from '../../../student.paths';
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
  template: '<app-competency-table [competencies]="competenciesSignal()" [buttons]="buttons" />',
})
export class DraftCompetencyTable {
  private draftStore = inject(ProfileDraftStore);

  userID = input.required<string>();

  competenciesSignal = computed(() =>
    this.draftStore
      .competenciesDraft()
      .map((v, i) => ({ languageCompetencyID: i, ...v }) as LanguageCompetencyTableDTO),
  );

  buttons: Button<LanguageCompetencyData>[] = [
    createButton(
      () => studentsTree.new.userID(this.userID()).language_competencies.create.segments,
    ),
    updateButton(
      (row) =>
        studentsTree.new.userID(this.userID()).language_competencies.update.competencyIndex(
          this.draftStore
            .competenciesDraft()
            .findIndex((v) => v == row)
            .toString(),
        ).segments,
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
}
