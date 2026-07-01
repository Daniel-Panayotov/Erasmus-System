import { Component, computed, inject } from '@angular/core';
import { administration } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';
import { InstitutionsStore } from './institutions.store';

@Component({
  selector: 'app-institutions-shell',
  imports: [PageShell],
  providers: [InstitutionsStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class InstitutionsShell {
  private institutionsStore = inject(InstitutionsStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedInstitutionID = this.institutionsStore.selectedinstitutionID;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      tap((e) => {
        const institutionID = this.route.firstChild?.snapshot.params['institutionID'] ?? null;
        this.selectedInstitutionID.set(institutionID);
      }),
      map((e) => e.url),
      startWith(this.router.url),
    ),
  );

  tabs = computed(() => [
    { label: 'Institutions', url: administration.institutions.view.segments },
    ...(this.currentUrl()?.includes('create')
      ? [
          { label: 'Create institution', url: administration.institutions.create.segments },
          { label: 'Add Contacts', url: administration.institutions.create.contacts.segments },
          { label: 'Add Faculties', url: administration.institutions.create.faculties.segments },
        ]
      : [
          {
            label: 'Contacts',
            disabled: this.selectedInstitutionID() == null ? true : false,
            url: administration.institutions.institutionID(
              this.selectedInstitutionID()?.toString() ?? '',
            ).contacts.segments,
          },
          {
            label: 'Faculties',
            disabled: this.selectedInstitutionID() == null ? true : false,
            url: administration.institutions.institutionID(
              this.selectedInstitutionID()?.toString() ?? '',
            ).faculties.segments,
          },
        ]),
  ]);
}
