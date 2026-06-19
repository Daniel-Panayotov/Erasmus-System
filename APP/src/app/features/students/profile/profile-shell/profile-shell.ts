import { Component, inject, input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-shell',
  imports: [RouterOutlet, MatTab, MatTabGroup],
  templateUrl: './profile-shell.html',
  styleUrl: './profile-shell.css',
})
export class ProfileShell {
  private router = inject(Router);

  studentID = input.required<number>();

  navigate(index: number) {
    if (index == 0) this.router.navigateByUrl(`students/${this.studentID()}/profile/view`);
    else if (index == 1)
      this.router.navigateByUrl(`students/${this.studentID()}/profile/language-competencies`);
    else this.router.navigateByUrl(`students/${this.studentID()}/profile/update`);
  }
}
