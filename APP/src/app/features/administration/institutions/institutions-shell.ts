import { Component, computed, inject } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { InstitutionsStore } from './institutions.store';

@Component({
  selector: 'app-institutions-shell',
  imports: [PageShell],
  providers: [InstitutionsStore],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class InstitutionsShell {
  private institutionStore = inject(InstitutionsStore);
  private router = inject(Router);

  selectedInstitutionID = this.institutionStore.selectedinstitutionID;

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e.type == EventType.NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  tabs = computed(() => [
    { label: 'Institutions', url: administrationPaths.institutions.view },
    ...(this.currentUrl()?.includes('create')
      ? [
          { label: 'Create institution', url: administrationPaths.institutions.create },
          { label: 'Add Contacts', url: administrationPaths.institutions.create_contacts },
          { label: 'Add Faculties', url: administrationPaths.institutions.create_faculties },
        ]
      : [
          {
            label: 'Contacts',
            disabled: this.selectedInstitutionID() == null ? true : false,
            url: administrationPaths.institutions.contacts(
              this.selectedInstitutionID()?.toString() ?? '',
            ),
          },
          {
            label: 'Faculties',
            disabled: this.selectedInstitutionID() == null ? true : false,
            url: administrationPaths.institutions.faculties(
              this.selectedInstitutionID()?.toString() ?? '',
            ),
          },
        ]),
  ]);
}
