import { Component, computed, inject, input, OnDestroy, Signal } from '@angular/core';
import { LanguageCompetencyTableDTO } from '../../../models/language-competency.model';
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
  template: '<app-competency-table [competencies]="competenciesSignal()" [buttons]="buttons()" />',
})
export class DraftCompetencyTable implements OnDestroy {
  private draftStore = inject(ProfileDraftStore);

  userID = input.required<string>();

  competenciesSignal = computed(() =>
    this.draftStore.competenciesDraft().map((v, i) => {
      this.competenciesSignal().forEach((c) => {
        if (c.certificateUrl) URL.revokeObjectURL(c.certificateUrl);
      });
      return {
        languageCompetencyID: i,
        certificateUrl: v.certificate ? URL.createObjectURL(v.certificate) : undefined,
        ...v,
      } as LanguageCompetencyTableDTO;
    }),
  );

  ngOnDestroy(): void {
    this.competenciesSignal().forEach((c) => {
      if (c.certificateUrl) URL.revokeObjectURL(c.certificateUrl);
    });
  }

  buttons: Signal<Button<LanguageCompetencyTableDTO>[]> = computed(() => [
    createButton(
      () => studentsTree.new.userID(this.userID()).language_competencies.create.segments,
    ),
    updateButton(
      (row) =>
        studentsTree.new
          .userID(this.userID())
          .language_competencies.update.competencyIndex(row?.languageCompetencyID.toString() ?? '')
          .segments,
    ),
    deleteButton((row) => {
      const rowValue = row();
      if (!rowValue) return;

      if (rowValue.languageCompetencyID >= this.draftStore.competenciesDraft().length) return;

      removeFromArraySignalAt(this.draftStore.competenciesDraft, rowValue.languageCompetencyID);
      row.set(null);
    }),
  ]);
}
