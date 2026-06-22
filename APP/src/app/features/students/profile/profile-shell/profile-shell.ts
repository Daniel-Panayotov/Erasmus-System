import { Component, computed, inject, input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { studentsPaths } from '../../students.paths';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-shell',
  imports: [RouterOutlet, MatTab, MatTabGroup],
  templateUrl: './profile-shell.html',
  styleUrl: './profile-shell.css',
})
export class ProfileShell {
  private router = inject(Router);

  studentID = input.required<string>();

  tabIndex = toSignal(
    this.router.events.pipe(
      filter((v) => v.type == EventType.NavigationEnd),
      map((v: any) => {
        const url: string = v.urlAfterRedirects;
        const urls = this.urls();

        const value = urls.find((v) => url == v.join('/'));

        if (!value) return urls.length;

        return urls.findIndex((v) => v == value);
      }),
    ),
  );

  urls = computed(() => [
    studentsPaths.profiles(this.studentID()).view,
    studentsPaths.profiles(this.studentID()).competencies_table,
    studentsPaths.profiles(this.studentID()).update,
  ]);

  navigate(index: number) {
    if (index > this.urls().length - 1) return;
    this.router.navigate(this.urls()[index]);
  }
}
