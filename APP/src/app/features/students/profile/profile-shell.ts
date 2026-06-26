import { Component, computed, input } from '@angular/core';
import { studentPaths } from '../student.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-profile-shell',
  imports: [PageShell],
  template: '<app-page-shell [tabs]=tabs() />',
})
export class ProfileShell {
  studentID = input.required<string>();

  tabs = computed(() => [
    {
      label: 'Profile',
      url: studentPaths.profiles(this.studentID()).view,
    },
    {
      label: 'Language competencies',
      url: studentPaths.profiles(this.studentID()).competencies_table,
    },
    {
      label: 'Profile update',
      url: studentPaths.profiles(this.studentID()).update,
    },
  ]);
}
