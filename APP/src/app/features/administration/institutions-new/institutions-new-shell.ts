import { Component } from '@angular/core';
import { administrationPaths } from '../administration.paths';
import { PageShell } from '../../../shared/components/page-shell/page-shell';

@Component({
  selector: 'app-institutions-new-shell',
  imports: [PageShell],
  template: '<app-page-shell [tabs]="tabs" />',
})
export class InstitutionsNewShell {
  tabs = [
    {
      label: 'Create institution',
      url: administrationPaths.institutions_new.create,
    },
    {
      label: 'Add Contacts',
      url: administrationPaths.institutions_new.contacts,
    },
    {
      label: 'Add Faculties',
      url: administrationPaths.institutions_new.faculties,
    },
  ];
}
