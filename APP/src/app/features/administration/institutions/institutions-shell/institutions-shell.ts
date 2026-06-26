import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroup } from '../../../../shared/components/tab-group/tab-group';
import { administrationPaths } from '../../administration.paths';

@Component({
  selector: 'app-institutions-shell',
  imports: [RouterOutlet, TabGroup],
  templateUrl: './institutions-shell.html',
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
