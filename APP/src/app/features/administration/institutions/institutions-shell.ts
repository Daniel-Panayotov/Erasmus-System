import { Component, computed, signal } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-institutions-shell',
  imports: [PageShell],
  template: '<app-page-shell [tabs]="tabs()" />',
})
export class InstitutionsShell {
  selectedInstitutionID = signal<string | null>(null);

  tabs = computed(() => [
    {
      label: 'Institutions',
      url: administrationPaths.institutions.view,
    },
    {
      label: 'Contacts',
      disabled: this.selectedInstitutionID() == null ? true : false,
      url: administrationPaths.institutions.contacts(this.selectedInstitutionID() ?? ''),
    },
    {
      label: 'Faculties',
      disabled: this.selectedInstitutionID() == null ? true : false,
      url: administrationPaths.institutions.faculties(this.selectedInstitutionID() ?? ''),
    },
  ]);
}
