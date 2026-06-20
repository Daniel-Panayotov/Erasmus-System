import { Component, inject, input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';
import { studentsPaths } from '../../students.paths';

@Component({
  selector: 'app-profile-shell',
  imports: [RouterOutlet, MatTab, MatTabGroup],
  templateUrl: './profile-shell.html',
  styleUrl: './profile-shell.css',
})
export class ProfileShell {
  private router = inject(Router);

  studentID = input.required<string>();

  navigate(index: number) {
    if (index == 0) this.router.navigate(studentsPaths.profileView(this.studentID()));
    else if (index == 1) this.router.navigate(studentsPaths.languageCompetencies(this.studentID()));
    else this.router.navigate(studentsPaths.profileUpdate(this.studentID()));
  }
}
