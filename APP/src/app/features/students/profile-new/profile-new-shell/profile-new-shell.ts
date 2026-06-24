import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { studentPaths } from '../../student.paths';
import { ProfileDraftStore } from '../profile-draft.store';

@Component({
  selector: 'app-profile-new-shell',
  imports: [RouterOutlet, MatTab, MatTabGroup],
  providers: [ProfileDraftStore],
  templateUrl: './profile-new-shell.html',
  styleUrl: './profile-new-shell.css',
})
export class ProfileNewShell {
  private router = inject(Router);

  userID = input.required<string>();

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
    studentPaths.newProfile(this.userID()).profile,
    studentPaths.newProfile(this.userID()).competencies_table,
  ]);

  navigate(index: number) {
    if (index > this.urls().length - 1) return;
    this.router.navigate(this.urls()[index]);
  }
}
