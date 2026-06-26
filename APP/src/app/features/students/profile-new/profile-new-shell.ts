import { Component, computed, input } from '@angular/core';
import { studentPaths } from '../student.paths';
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
      url: studentPaths.newProfile(this.userID()).profile,
    },
    {
      label: 'Language competencies',
      url: studentPaths.newProfile(this.userID()).competencies_table,
    },
  ]);
}
