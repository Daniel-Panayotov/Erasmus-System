import { Component, computed, inject, input } from '@angular/core';
import { studentsTree } from '../student.paths';
import { ProfileDraftStore } from './profile-draft.store';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { CanDeactivateFormInterface } from '../../../core/guards/form.guard';

@Component({
  selector: 'app-profile-new-shell',
  imports: [PageShell],
  providers: [ProfileDraftStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class ProfileNewShell implements CanDeactivateFormInterface {
  private draftStore = inject(ProfileDraftStore);

  userID = input.required<string>();

  canDeactivate = computed(
    () => !this.draftStore.studentDraft() && this.draftStore.competenciesDraft().length == 0,
  );

  tabs = computed(() => [
    {
      label: 'Create profile',
      url: studentsTree.new.userID(this.userID()).profile.segments,
    },
    {
      label: 'Language competencies',
      url: studentsTree.new.userID(this.userID()).language_competencies.segments,
    },
  ]);
}
