import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { studentPaths } from '../../student.paths';
import { ProfileDraftStore } from '../profile-draft.store';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';

@Component({
  selector: 'app-profile-new-shell',
  imports: [RouterOutlet, TabGroup],
  providers: [ProfileDraftStore],
  templateUrl: './profile-new-shell.html',
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
