import { Component, computed, inject } from '@angular/core';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, tap } from 'rxjs';
import { administration } from '../administration.paths';
import { UniversityStore } from './university.store';

@Component({
  selector: 'app-contacts-shell',
  imports: [PageShell],
  providers: [UniversityStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class UniversityShell {
  private universityStore = inject(UniversityStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedUniversityID = this.universityStore.selectedUniversityID;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      tap(() => {
        const universityID = this.route.firstChild?.snapshot.params['universityID'] ?? null;
        this.selectedUniversityID.set(universityID);
      }),
      map((e) => e.url),
      startWith(this.router.url),
    ),
  );

  tabs = computed(() => [
    { label: 'Universities', url: administration.universities.view.segments },
    ...(this.currentUrl()?.includes('create')
      ? [{ label: 'Create University', url: administration.universities.create.segments }]
      : []),
  ]);
}
