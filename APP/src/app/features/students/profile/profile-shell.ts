import { Component, computed, input } from '@angular/core';
import { studentsTree } from '../student.paths';
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
      url: studentsTree.studentID(this.studentID()).profile.view.segments,
    },
    {
      label: 'Language competencies',
      url: studentsTree.studentID(this.studentID()).profile.language_competencies.segments,
    },
    {
      label: 'Profile update',
      url: studentsTree.studentID(this.studentID()).profile.update.segments,
    },
  ]);
}
