import { Component, computed, input } from '@angular/core';
import { studentsTree } from '../student.paths';
import { ProfileDraftStore } from './profile-draft.store';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-profile-new-shell',
  imports: [PageShell],
  providers: [ProfileDraftStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class ProfileNewShell {
  userID = input.required<string>();

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
