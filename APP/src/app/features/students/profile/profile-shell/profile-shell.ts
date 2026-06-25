import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { studentPaths } from '../../student.paths';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';

@Component({
  selector: 'app-profile-shell',
  imports: [RouterOutlet, TabGroup],
  templateUrl: './profile-shell.html',
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
